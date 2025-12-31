/**
 * Signup Screen
 * Handles new user registration with form validation
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { User, Mail, Lock, Calendar, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Button3D } from '../../../app/components/3d-button';
import { Card3D } from '../../../app/components/3d-card';
import { FloatingMascot } from '../../../app/components/floating-mascot';
import { useAuth } from '../../../hooks/useAuth';
import { errorLoggingService } from '../../../lib/services/error-logging.service';

// Validation schema
const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters')
      .regex(/^[a-zA-Z\s-]+$/, 'First name can only contain letters, spaces, and hyphens'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    age: z
      .number({ invalid_type_error: 'Age is required' })
      .min(8, 'You must be at least 8 years old')
      .max(16, 'Age must be 16 or under for kid accounts'),
    userType: z.enum(['kid', 'parent']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function Signup() {
  const navigate = useNavigate();
  const { signup, signInWithGoogle, isLoading: authLoading } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: undefined,
      userType: 'kid',
    },
  });

  const isLoading = authLoading || isSubmitting;
  const userType = watch('userType');

  const onSubmit = async (data: SignupFormData) => {
    try {
      setSubmitError(null);

      // Add breadcrumb for tracking
      errorLoggingService.addBreadcrumb({
        category: 'auth',
        message: 'Signup attempt',
        level: 'info',
        data: { email: data.email, userType: data.userType },
      });

      await signup({
        firstName: data.firstName,
        email: data.email,
        password: data.password,
        age: data.userType === 'kid' ? data.age : undefined,
      });

      // Redirect to email verification page
      navigate('/verify-email', {
        state: { email: data.email }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Signup failed. Please try again.';
      setSubmitError(errorMessage);
    }
  };

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    try {
      setSubmitError(null);
      if (!response.credential) {
        throw new Error('No credential received from Google');
      }

      await signInWithGoogle(response.credential);
      navigate('/kid-dashboard');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Google Sign In failed. Please try again.';
      setSubmitError(errorMessage);
    }
  };

  const handleGoogleError = () => {
    setSubmitError('Google Sign In failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30 -z-10" />

      <div className="max-w-md w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FloatingMascot
            size="lg"
            message={
              userType === 'kid'
                ? "Let's create something amazing!"
                : 'Monitor your child&apos;s progress'
            }
          />
        </motion.div>

        <Card3D variant="default" hover={false}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Join ClayMind</h2>
              <p className="text-gray-600">Start your AI learning adventure</p>
            </div>

            {/* Error Alert */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-2 border-red-200 rounded-2xl p-4"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-800">{submitError}</p>
                </div>
              </motion.div>
            )}

            {/* User Type Toggle */}
            <div className="flex gap-3">
              <motion.label
                className={`flex-1 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  userType === 'kid'
                    ? 'border-purple-500 bg-purple-50 shadow-[0_4px_15px_rgba(124,58,237,0.2)]'
                    : 'border-gray-200 bg-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  {...register('userType')}
                  type="radio"
                  value="kid"
                  className="sr-only"
                />
                <div className="flex flex-col items-center gap-2">
                  <Sparkles
                    className={`w-6 h-6 ${userType === 'kid' ? 'text-purple-500' : 'text-gray-400'}`}
                  />
                  <span
                    className={`font-bold ${userType === 'kid' ? 'text-purple-600' : 'text-gray-500'}`}
                  >
                    I'm a Kid
                  </span>
                </div>
              </motion.label>

              <motion.label
                className={`flex-1 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  userType === 'parent'
                    ? 'border-purple-500 bg-purple-50 shadow-[0_4px_15px_rgba(124,58,237,0.2)]'
                    : 'border-gray-200 bg-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  {...register('userType')}
                  type="radio"
                  value="parent"
                  className="sr-only"
                />
                <div className="flex flex-col items-center gap-2">
                  <User
                    className={`w-6 h-6 ${userType === 'parent' ? 'text-purple-500' : 'text-gray-400'}`}
                  />
                  <span
                    className={`font-bold ${userType === 'parent' ? 'text-purple-600' : 'text-gray-500'}`}
                  >
                    I'm a Parent
                  </span>
                </div>
              </motion.label>
            </div>

            {/* Google Sign In - Temporarily Disabled */}
            {/*
            <div className="flex flex-col items-center gap-4">
              <div className="w-full flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  text="signup_with"
                  shape="pill"
                  size="large"
                  theme="outline"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500 font-medium">Or sign up with email</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            */}

            {/* Form Fields */}
            <div className="space-y-4">
              {/* First Name Field */}
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-2 font-medium">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('firstName')}
                    id="firstName"
                    type="text"
                    placeholder="e.g., Sarah"
                    disabled={isLoading}
                    aria-invalid={!!errors.firstName}
                    className={`w-full pl-12 pr-6 py-4 rounded-2xl bg-purple-50 border-2 transition-all outline-none ${
                      errors.firstName
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-purple-100 focus:border-purple-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="e.g., sarah@example.com"
                    disabled={isLoading}
                    aria-invalid={!!errors.email}
                    className={`w-full pl-12 pr-6 py-4 rounded-2xl bg-purple-50 border-2 transition-all outline-none ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-purple-100 focus:border-purple-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Age Field (Kids only) */}
              {userType === 'kid' && (
                <div>
                  <label htmlFor="age" className="block text-gray-700 mb-2 font-medium">
                    Age
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('age', { valueAsNumber: true })}
                      id="age"
                      type="number"
                      placeholder="Enter your age (8-16)"
                      min="8"
                      max="16"
                      disabled={isLoading}
                      aria-invalid={!!errors.age}
                      className={`w-full pl-12 pr-6 py-4 rounded-2xl bg-purple-50 border-2 transition-all outline-none ${
                        errors.age
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-purple-100 focus:border-purple-500'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  </div>
                  {errors.age && (
                    <p className="mt-2 text-sm text-red-600">{errors.age.message}</p>
                  )}
                </div>
              )}

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('password')}
                    id="password"
                    type="password"
                    placeholder="e.g., MyPass123"
                    disabled={isLoading}
                    aria-invalid={!!errors.password}
                    className={`w-full pl-12 pr-6 py-4 rounded-2xl bg-purple-50 border-2 transition-all outline-none ${
                      errors.password
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-purple-100 focus:border-purple-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.password ? (
                  <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">
                    Must be 8+ characters with uppercase, lowercase, and a number
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('confirmPassword')}
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    aria-invalid={!!errors.confirmPassword}
                    className={`w-full pl-12 pr-6 py-4 rounded-2xl bg-purple-50 border-2 transition-all outline-none ${
                      errors.confirmPassword
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-purple-100 focus:border-purple-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button3D
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </Button3D>

            {/* Sign in link */}
            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </form>
        </Card3D>
      </div>
    </div>
  );
}
