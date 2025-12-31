/**
 * Profile Screen
 * User profile with avatar customization, badges, achievements, and stats
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  User,
  Star,
  Trophy,
  Settings as SettingsIcon,
  Brain,
  Sparkles,
  Heart,
  Loader2,
  Check,
  AlertCircle,
  Target,
  Clock,
  Flame,
} from 'lucide-react';
import { Card, Button, LoadingState as LoadingStateUI, ErrorState } from '../../../components/ui';
import {
  userService,
  type ProfileData,
  type AvatarOption,
} from '../../../lib/services/user.service';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

const BADGE_ICONS: Record<string, React.ReactNode> = {
  Star: <Star className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
};

const AVATAR_COLORS: Record<string, string> = {
  purple: 'bg-[var(--color-purple-500)]',
  amber: 'bg-[var(--color-amber-500)]',
  pink: 'bg-[var(--color-slate-500)]',
  blue: 'bg-[var(--color-purple-600)]',
  green: 'bg-[var(--color-purple-400)]',
  red: 'bg-[var(--color-amber-600)]',
};

export function Profile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [avatarOptions] = useState<AvatarOption[]>(userService.getAvatarOptions());
  const [selectedAvatarId, setSelectedAvatarId] = useState<number>(
    userService.getSelectedAvatarId()
  );
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoadingState('loading');
      setError(null);

      const data = await userService.getProfileData();
      setProfileData(data);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      setLoadingState('error');
    }
  };

  const handleAvatarSelect = useCallback(
    async (avatarId: number) => {
      if (savingAvatar || avatarId === selectedAvatarId) return;

      setSavingAvatar(true);
      setAvatarMessage(null);

      try {
        const result = await userService.updateAvatar(avatarId);
        if (result.success) {
          setSelectedAvatarId(avatarId);
          setAvatarMessage({ type: 'success', text: result.message });
          setTimeout(() => setAvatarMessage(null), 3000);
        } else {
          setAvatarMessage({ type: 'error', text: result.message });
        }
      } catch (err) {
        setAvatarMessage({
          type: 'error',
          text: err instanceof Error ? err.message : 'Failed to update avatar',
        });
      } finally {
        setSavingAvatar(false);
      }
    },
    [savingAvatar, selectedAvatarId]
  );

  const handleOpenSettings = useCallback(() => {
    navigate('/settings');
  }, [navigate]);

  const handleViewAllBadges = useCallback(() => {
    navigate('/badges');
  }, [navigate]);

  const getBadgeIcon = (iconName: string): React.ReactNode => {
    return BADGE_ICONS[iconName] || <Star className="w-6 h-6" />;
  };

  // Loading state
  if (loadingState === 'loading') {
    return <LoadingStateUI message="Loading your profile..." size="lg" fullPage />;
  }

  // Error state
  if (loadingState === 'error') {
    return (
      <ErrorState
        title="Couldn't load profile"
        message={error || 'Something went wrong'}
        onRetry={loadProfileData}
        icon={<User className="w-8 h-8 text-[var(--color-error)]" />}
        fullPage
      />
    );
  }

  if (!profileData) return null;

  const { profile, progress, badges, achievements, stats } = profileData;

  return (
    <div className="min-h-screen bg-[var(--color-zinc-50)] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="default" padding="lg" className="bg-[var(--color-purple-500)]">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-white mb-1">{profile.username}</h1>
                <p className="text-white/80 text-sm mb-3">Member since {profile.joinedDate}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="bg-white/20 px-3 py-1.5 rounded-lg">
                    <span className="text-white/80 text-sm">Level </span>
                    <span className="text-white font-bold">{progress.currentLevel}</span>
                  </div>
                  <div className="bg-white/20 px-3 py-1.5 rounded-lg">
                    <span className="text-white/80 text-sm">Badges </span>
                    <span className="text-white font-bold">{progress.badgesEarned}</span>
                  </div>
                  <div className="bg-white/20 px-3 py-1.5 rounded-lg">
                    <span className="text-white/80 text-sm">Projects </span>
                    <span className="text-white font-bold">{profile.totalProjects}</span>
                  </div>
                </div>
              </div>

              {/* Settings Button */}
              <Button
                variant="secondary"
                size="md"
                icon={<SettingsIcon className="w-4 h-4" />}
                onClick={handleOpenSettings}
              >
                Settings
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Avatar Customization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--color-slate-900)]">Customize Your Avatar</h2>
              {savingAvatar && (
                <div className="flex items-center gap-2 text-[var(--color-purple-600)]">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Saving...</span>
                </div>
              )}
              {avatarMessage && (
                <div
                  className={`flex items-center gap-2 text-sm ${
                    avatarMessage.type === 'success' ? 'text-[var(--color-purple-600)]' : 'text-[var(--color-error)]'
                  }`}
                >
                  {avatarMessage.type === 'success' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>{avatarMessage.text}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar.id}
                  className={`aspect-square rounded-xl ${AVATAR_COLORS[avatar.color] || 'bg-[var(--color-slate-400)]'} flex items-center justify-center text-3xl transition-all ${
                    avatar.id === selectedAvatarId ? 'ring-2 ring-[var(--color-purple-500)] ring-offset-2' : ''
                  } ${savingAvatar ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                  onClick={() => handleAvatarSelect(avatar.id)}
                  disabled={savingAvatar}
                >
                  {avatar.icon}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--color-slate-900)]">Top Badges</h2>
              <Button variant="outline" size="sm" onClick={handleViewAllBadges}>
                View All ({progress.badgesEarned})
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className={`text-center p-4 rounded-xl ${badge.unlocked ? 'bg-[var(--color-zinc-100)]' : 'bg-[var(--color-slate-100)] opacity-50'}`}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${badge.unlocked ? 'bg-[var(--color-amber-500)] text-white' : 'bg-[var(--color-slate-300)] text-[var(--color-slate-500)]'}`}>
                    {getBadgeIcon(badge.iconName)}
                  </div>
                  <p className="text-sm font-medium text-[var(--color-slate-700)]">{badge.label}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="default" padding="lg">
            <h2 className="text-xl font-bold text-[var(--color-slate-900)] mb-4">Recent Achievements</h2>

            <div className="space-y-3">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-zinc-100)]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-amber-500)] flex items-center justify-center text-white">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--color-slate-900)]">{achievement.title}</h3>
                    <p className="text-sm text-[var(--color-slate-600)]">
                      {achievement.description}
                      {achievement.progress !== undefined && achievement.target && (
                        <span className="ml-1">
                          ({achievement.progress}/{achievement.target})
                        </span>
                      )}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <div className="bg-[var(--color-purple-100)] text-[var(--color-purple-700)] px-2 py-1 rounded text-xs font-medium">
                      Unlocked
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="default" padding="lg" className="bg-[var(--color-purple-500)]">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stats.lessonsCompleted}
                </div>
                <div className="text-white/80 text-sm">Lessons Completed</div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Card variant="default" padding="lg">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[var(--color-slate-200)] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[var(--color-slate-600)]" />
                </div>
                <div className="text-2xl font-bold text-[var(--color-slate-900)] mb-1">
                  {userService.formatLearningTime(stats.totalLearningTimeMinutes)}
                </div>
                <div className="text-[var(--color-slate-600)] text-sm">Total Learning Time</div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="default" padding="lg" className="bg-[var(--color-amber-500)]">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stats.currentStreakDays}
                </div>
                <div className="text-white/80 text-sm">Day Streak</div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
