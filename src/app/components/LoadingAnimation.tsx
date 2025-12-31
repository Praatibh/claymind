/**
 * Beautiful Loading Animation Component
 * Fun animations for kids while AI generates
 */

import { motion } from 'motion/react';

interface LoadingAnimationProps {
  message?: string;
  type?: 'webapp' | 'chat';
}

export function LoadingAnimation({ message = 'Creating magic...', type = 'webapp' }: LoadingAnimationProps) {
  const animations = {
    webapp: {
      icon: '🌐',
      colors: ['#3b82f6', '#06b6d4', '#8b5cf6'],
      particles: 8,
    },
    chat: {
      icon: '🤖',
      colors: ['#10b981', '#059669', '#14b8a6'],
      particles: 6,
    },
  };

  const config = animations[type];

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Main Loading Circle */}
      <div className="relative w-32 h-32 mb-8">
        {/* Rotating Rainbow Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${config.colors[0]}, ${config.colors[1]}, ${config.colors[2]}, ${config.colors[0]})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner White Circle */}
        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
          {/* Bouncing Emoji */}
          <motion.div
            className="text-5xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {config.icon}
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(config.particles)].map((_, i) => {
          const size = 6 + Math.random() * 12;
          const delay = Math.random() * 2;
          const duration = 3 + Math.random() * 2;
          const xOffset = -50 + Math.random() * 100;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${20 + Math.random() * 60}%`,
                background: config.colors[i % config.colors.length],
                opacity: 0.6,
              }}
              initial={{ y: '100vh', x: 0 }}
              animate={{
                y: '-100vh',
                x: [0, xOffset, -xOffset, 0],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          );
        })}
      </div>

      {/* Loading Dots */}
      <div className="flex gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{ background: config.colors[i] }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Loading Message */}
      <motion.p
        className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {message}
      </motion.p>

      {/* Fun Facts While Loading */}
      <motion.div
        className="mt-6 px-6 py-3 bg-purple-50 border-2 border-purple-200 rounded-2xl max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-purple-800 text-center">
          💡 <strong>Fun Fact:</strong> AI is thinking at the speed of light! ⚡
        </p>
      </motion.div>
    </div>
  );
}
