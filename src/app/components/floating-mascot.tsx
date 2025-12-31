import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface FloatingMascotProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function FloatingMascot({ message, size = "md" }: FloatingMascotProps) {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <motion.div
      className="relative inline-flex items-center gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Mascot */}
      <motion.div
        className={`${sizes[size]} rounded-full bg-gradient-to-br from-purple-400 via-violet-400 to-purple-500 shadow-[0_8px_30px_rgba(167,139,250,0.5)] flex items-center justify-center relative`}
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Eyes */}
        <div className="flex gap-2">
          <motion.div 
            className="w-3 h-3 bg-white rounded-full"
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.div 
            className="w-3 h-3 bg-white rounded-full"
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
        </div>
        
        {/* Sparkle effect */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
        </motion.div>
      </motion.div>

      {/* Speech bubble */}
      {message && (
        <motion.div
          className="bg-white px-6 py-3 rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.1)] relative max-w-xs"
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-4 h-4 bg-white rotate-45" />
          <p className="relative z-10 text-gray-800">{message}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
