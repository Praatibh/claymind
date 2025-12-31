/**
 * Success Celebration Animation
 * Shows when AI generation completes successfully
 */

import { motion } from 'motion/react';
import { useEffect } from 'react';

interface SuccessAnimationProps {
  message?: string;
  onComplete?: () => void;
}

export function SuccessAnimation({
  message = 'Creation Complete!',
  onComplete
}: SuccessAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Confetti Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => {
          const colors = ['#9333ea', '#ec4899', '#3b82f6', '#f59e0b', '#10b981'];
          const color = colors[i % colors.length];
          const startX = Math.random() * 100;
          const endX = startX + (Math.random() - 0.5) * 50;
          const rotation = Math.random() * 720 - 360;
          const size = 8 + Math.random() * 12;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                background: color,
                left: `${startX}%`,
                top: '-5%',
              }}
              initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
              animate={{
                y: '110vh',
                x: `${endX - startX}vw`,
                rotate: rotation,
                opacity: 0,
              }}
              transition={{
                duration: 2 + Math.random() * 1,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </div>

      {/* Success Message */}
      <motion.div
        className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-4 pointer-events-auto"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 10 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        {/* Sparkle Effect */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="text-6xl">✨</div>
        </motion.div>

        {/* Success Icon */}
        <motion.div
          className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.h2
          className="text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your creation is ready! 🎉
        </motion.p>

        {/* Celebration Emojis */}
        <motion.div
          className="flex justify-center gap-3 mt-4 text-3xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          {['🎊', '🎨', '✨', '🚀', '🌟'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
