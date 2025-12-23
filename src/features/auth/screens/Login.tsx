/**
 * Login Screen
 * Handles user authentication with form validation
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { Button3D } from '../../../app/components/3d-button';
import { Card3D } from '../../../app/components/3d-card';
import { FloatingMascot } from '../../../app/components/floating-mascot';
import { useAuth } from '../../../hooks/useAuth';
import { errorLoggingService } from '../../../lib/services/error-logging.service';

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLoading = authLoading || isSubmitting;

  const onSubmit = async (data: LoginFormData) => {
    try {
      setSubmitError(null);

      // Add breadcrumb for tracking
      errorLoggingService.addBreadcrumb({
        category: 'auth',
        message: 'Login attempt',
        level: 'info',
        data: { email: data.email },
      });

      await login(data);

      // Redirect to dashboard on success
      navigate('/kid-dashboard');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed. Please try again.';
      setSubmitError(errorMessage);
    }
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
          <FloatingMascot size="lg" message="Welcome back! Let's continue learning!" />
        </motion.div>

        <Card3D variant="default" hover={false}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Continue your learning journey</p>
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

            {/* Form Fields */}
            <div className="space-y-4">
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
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    disabled={isLoading}
                    aria-invalid={!!errors.password}
                    className={`w-full pl-12 pr-6 py-4 rounded-2xl bg-purple-50 border-2 transition-all outline-none ${
                      errors.password
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-purple-100 focus:border-purple-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
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
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button3D>

            {/* Sign up link */}
            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        </Card3D>
      </div>
    </div>
  );
}
