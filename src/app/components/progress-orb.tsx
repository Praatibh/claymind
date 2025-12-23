import { motion } from "motion/react";

interface ProgressOrbProps {
  progress: number; // 0-100
  level?: number;
  size?: "sm" | "md" | "lg";
}

export function ProgressOrb({ progress, level, size = "md" }: ProgressOrbProps) {
  const sizes = {
    sm: { container: "w-16 h-16", text: "text-sm" },
    md: { container: "w-24 h-24", text: "text-lg" },
    lg: { container: "w-32 h-32", text: "text-2xl" },
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className={`relative ${sizes[size].container}`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 blur-xl opacity-50"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* SVG Progress Circle */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="rgba(167, 139, 250, 0.2)"
          strokeWidth="6"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {level !== undefined ? (
            <>
              <div className={`${sizes[size].text} font-bold text-purple-600`}>{level}</div>
              <div className="text-xs text-purple-400">Level</div>
            </>
          ) : (
            <div className={`${sizes[size].text} font-bold text-purple-600`}>{Math.round(progress)}%</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
