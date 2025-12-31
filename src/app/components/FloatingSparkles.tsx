/**
 * Floating Sparkles - Decorative background animation
 * Adds magical floating sparkles across the screen
 */

import { motion } from 'motion/react';

export function FloatingSparkles() {
  const sparkles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
    size: 20 + Math.random() * 30,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: sparkle.left,
            fontSize: sparkle.size,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.animationDelay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
