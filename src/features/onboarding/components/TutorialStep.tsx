/**
 * Tutorial Step (Step 2 - Skippable)
 * Displays role-specific feature highlights and tour
 */

import { motion } from 'motion/react';
import type { UserRole } from '../../../lib/utils/rbac';
import { TUTORIAL_CONTENT } from '../utils/onboarding-content';
import { Card3D } from '../../../app/components/3d-card';

interface TutorialStepProps {
  role: UserRole;
  onNext: () => void;
  onSkip: () => void;
}

export function TutorialStep({ role, onNext, onSkip }: TutorialStepProps) {
  const content = TUTORIAL_CONTENT[role];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{content.title}</h1>
        <p className="text-lg text-gray-600">{content.subtitle}</p>
      </div>

      {/* Skip Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={onSkip}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
        >
          {content.skipCTA}
        </button>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {content.features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Primary CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {content.primaryCTA}
      </motion.button>
    </motion.div>
  );
}
