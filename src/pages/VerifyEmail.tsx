/**
 * Email Verification Page
 * UX states: waiting for verification, resend functionality, error handling
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function VerifyEmail() {
  const [email, setEmail] = useState<string>('');
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from location state (passed from signup)
    const stateEmail = (location.state as any)?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    } else {
      // If no email in state, check if user is logged in
      checkUserEmail();
    }
  }, [location]);

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  async function checkUserEmail() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      setEmail(user.email);
    } else {
      // No user session, redirect to login
      navigate('/login');
    }
  }

  async function handleResend() {
    if (!email || countdown > 0) return;

    setResending(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      setMessage({
        type: 'success',
        text: 'Verification email sent! Check your inbox and spam folder.'
      });
      setCountdown(60); // 60 second cooldown
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to resend email. Please try again.'
      });
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Check Your Email
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            We sent a verification link to
          </p>
          <p className="text-purple-600 font-semibold mb-6">
            {email || 'your email address'}
          </p>
          <p className="text-gray-600 text-sm mb-8">
            Click the link in the email to verify your account and start learning!
          </p>

          {/* Message Alert */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          {/* Resend Button */}
          <button
            onClick={handleResend}
            disabled={resending || countdown > 0}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-medium
                     hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed
                     transition-colors duration-200"
          >
            {resending
              ? 'Sending...'
              : countdown > 0
                ? `Resend in ${countdown}s`
                : 'Resend Verification Email'
            }
          </button>

          {/* Tips */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900 font-medium mb-2">
              Did not receive the email?
            </p>
            <ul className="text-xs text-blue-700 text-left space-y-1">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure {email || 'the email'} is correct</li>
              <li>• Wait a few minutes and check again</li>
              <li>• Click "Resend" if needed</li>
            </ul>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-sm text-gray-600">
            Wrong email?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign up again
            </button>
          </div>

          <div className="mt-2 text-sm text-gray-600">
            Already verified?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Log in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
