/**
 * Profile Setup Step (Step 1)
 * Collects username, avatar, and bio from the user
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { useAuth } from '../../../hooks/useAuth';
import { onboardingService } from '../../../lib/services/onboarding.service';
import { getUserRole } from '../../../lib/utils/rbac';
import { Loader2, Check, X } from 'lucide-react';

const profileSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  avatar: z.string().min(1, 'Please select an avatar'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileSetupStepProps {
  onNext: () => void;
}

// Available avatar emojis
const AVATAR_OPTIONS = [
  '😊', '🎮', '🚀', '🎨', '🤖', '🌟', '🔥', '⚡',
  '🎯', '🌈', '🦄', '🐱', '🐶', '🐼', '🦊', '🦁',
  '🎭', '🎪', '🎨', '🎬', '🎸', '🎺', '🎹', '🎤',
];

export function ProfileSetupStep({ onNext }: ProfileSetupStepProps) {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const role = getUserRole(user);
  const rolePlaceholders: Record<string, string> = {
    student: "Tell us about yourself! What do you want to build?",
    parent: "Tell us about your child's interests...",
    teacher: "What subjects do you teach?",
    admin: "Your role in the platform...",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      avatar: AVATAR_OPTIONS[0],
      bio: '',
    },
  });

  const watchedUsername = watch('username');
  const watchedAvatar = watch('avatar');

  // Debounced username availability check
  useEffect(() => {
    if (!watchedUsername || watchedUsername.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    // Clear existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set new timeout for debounced check
    const timeout = setTimeout(async () => {
      setUsernameChecking(true);
      try {
        const available = await onboardingService.checkUsernameAvailability(watchedUsername);
        setUsernameAvailable(available);
      } catch (error) {
        console.error('Error checking username:', error);
        setUsernameAvailable(null);
      } finally {
        setUsernameChecking(false);
      }
    }, 500);

    setDebounceTimeout(timeout);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [watchedUsername]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user || !usernameAvailable) return;

    setSaving(true);
    try {
      await onboardingService.saveProfileSetup(user.id, {
        username: data.username,
        avatarUrl: data.avatar,
        bio: data.bio || undefined,
      });
      // Small delay for better UX - let the user see the success state
      await new Promise(resolve => setTimeout(resolve, 300));
      onNext();
    } catch (error) {
      console.error('Error saving profile:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save profile';
      alert(`❌ ${errorMessage}\n\nPlease try again.`);
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span className="text-4xl">{watchedAvatar}</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
        <p className="text-gray-600">Tell us about yourself to personalize your experience</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('username')}
              type="text"
              placeholder="your_username"
              className={`
                w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors
                ${errors.username ? 'border-red-500' : ''}
                ${usernameAvailable === true ? 'border-green-500' : ''}
                ${usernameAvailable === false ? 'border-red-500' : ''}
                ${!errors.username && usernameAvailable === null ? 'border-gray-300 focus:border-purple-500' : ''}
              `}
            />
            {/* Loading/Check/X indicator */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {usernameChecking && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
              {!usernameChecking && usernameAvailable === true && <Check className="w-5 h-5 text-green-500" />}
              {!usernameChecking && usernameAvailable === false && <X className="w-5 h-5 text-red-500" />}
            </div>
          </div>
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          {!errors.username && usernameAvailable === false && (
            <p className="text-red-500 text-sm mt-1">Username is already taken</p>
          )}
          {!errors.username && usernameAvailable === true && (
            <p className="text-green-500 text-sm mt-1">Username is available!</p>
          )}
        </div>

        {/* Avatar Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Your Avatar <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-8 gap-2">
            {AVATAR_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setValue('avatar', emoji)}
                className={`
                  w-12 h-12 text-2xl rounded-lg transition-all duration-200
                  ${watchedAvatar === emoji
                    ? 'bg-purple-100 ring-2 ring-purple-600 scale-110'
                    : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
                  }
                `}
              >
                {emoji}
              </button>
            ))}
          </div>
          {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>}
        </div>

        {/* Bio Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About Me <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <textarea
            {...register('bio')}
            rows={3}
            placeholder={rolePlaceholders[role] || "Tell us about yourself..."}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
            maxLength={200}
          />
          <p className="text-xs text-gray-500 mt-1">{watch('bio')?.length || 0}/200 characters</p>
          {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving || !usernameAvailable || !!errors.username}
          className={`
            w-full py-4 rounded-lg font-semibold text-white transition-all duration-200
            ${saving || !usernameAvailable || errors.username
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
            }
          `}
        >
          {saving ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Saving...
            </span>
          ) : (
            'Continue'
          )}
        </button>
      </form>
    </motion.div>
  );
}
