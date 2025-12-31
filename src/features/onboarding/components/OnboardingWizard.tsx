/**
 * Onboarding Wizard Wrapper
 * Provides progress indicator and wrapper layout for onboarding steps
 */

import { motion, AnimatePresence } from 'motion/react';

interface OnboardingWizardProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

export function OnboardingWizard({ currentStep, totalSteps, children }: OnboardingWizardProps) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-3">
            {Array.from({ length: totalSteps }).map((_, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;

              return (
                <div key={stepNumber} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                        transition-all duration-300
                        ${isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-300' : ''}
                        ${isCompleted ? 'bg-green-500 text-white' : ''}
                        ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-500' : ''}
                      `}
                    >
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        stepNumber
                      )}
                    </div>
                  </motion.div>

                  {/* Connector Line */}
                  {index < totalSteps - 1 && (
                    <div className="flex-1 h-1 mx-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-600"
                        initial={{ width: '0%' }}
                        animate={{ width: isCompleted ? '100%' : '0%' }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Step Label */}
          <p className="text-sm text-gray-600 mt-2 text-center">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full max-w-3xl"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
