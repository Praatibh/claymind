/**
 * Welcome Step (Step 3 - Final)
 * Celebration screen with "what to do next" guidance
 */

import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import type { UserRole } from '../../../lib/utils/rbac';
import { WELCOME_CONTENT } from '../utils/onboarding-content';
import { Loader2, Sparkles } from 'lucide-react';

interface WelcomeStepProps {
  role: UserRole;
  onComplete: () => Promise<void>;
  saving: boolean;
}

export function WelcomeStep({ role, onComplete, saving }: WelcomeStepProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const content = WELCOME_CONTENT[role];

  const handleComplete = async () => {
    await onComplete();
  };

  const handleSecondaryAction = () => {
    if (content.secondaryAction) {
      navigate(content.secondaryAction.path);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
    >
      {/* Celebration Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-20, 100],
              x: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: '0%',
            }}
          >
            {['🎉', '✨', '🎊', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.6, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles className="w-12 h-12 text-purple-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
          >
            {content.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600"
          >
            Hey {user?.firstName}! {content.message}
          </motion.p>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">🎯</span>
            What to do next:
          </h2>
          <ul className="space-y-3">
            {content.nextSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{step.text}</span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
            disabled={saving}
            className={`
              w-full py-4 rounded-lg font-semibold text-white transition-all duration-200
              ${saving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
              }
            `}
          >
            {saving ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Setting things up...
              </span>
            ) : (
              content.primaryAction.label
            )}
          </motion.button>

          {content.secondaryAction && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSecondaryAction}
              disabled={saving}
              className="w-full py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {content.secondaryAction.label}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
