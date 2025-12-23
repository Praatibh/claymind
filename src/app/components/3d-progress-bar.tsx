"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef, MouseEvent, useEffect, useState } from "react";
import { Sparkles, Star, Zap } from "lucide-react";

interface ProgressBar3DProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "xp" | "mission" | "streak" | "season";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  showParticles?: boolean;
  showRunner?: boolean;
  className?: string;
}

const variants = {
  xp: {
    bg: "bg-gradient-to-br from-[#2D9CDB] via-[#2D8CDB] to-[#1D7BC0]",
    track: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400",
    shadow: "shadow-[0_6px_0_0_#1a5c8a,0_8px_20px_rgba(45,156,219,0.3)]",
    innerShadow: "after:shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),inset_0_2px_6px_rgba(255,255,255,0.1)]",
    glow: "shadow-[0_0_20px_rgba(45,156,219,0.5)]",
    border: "border-t-2 border-t-[#3DACD9]/60 border-b-2 border-b-[#1a5c8a]/80",
    particle: "#2D9CDB",
    icon: Zap,
  },
  mission: {
    bg: "bg-gradient-to-br from-[#4ECDC4] via-[#45B8AF] to-[#3BA39A]",
    track: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400",
    shadow: "shadow-[0_6px_0_0_#2a7972,0_8px_20px_rgba(78,205,196,0.3)]",
    innerShadow: "after:shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),inset_0_2px_6px_rgba(255,255,255,0.1)]",
    glow: "shadow-[0_0_20px_rgba(78,205,196,0.5)]",
    border: "border-t-2 border-t-[#6FD9D1]/60 border-b-2 border-b-[#2a7972]/80",
    particle: "#4ECDC4",
    icon: Star,
  },
  streak: {
    bg: "bg-gradient-to-br from-[#FF6B6B] via-[#EE5A6F] to-[#D44D5C]",
    track: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400",
    shadow: "shadow-[0_6px_0_0_#a03c4a,0_8px_20px_rgba(255,107,107,0.3)]",
    innerShadow: "after:shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),inset_0_2px_6px_rgba(255,255,255,0.1)]",
    glow: "shadow-[0_0_20px_rgba(255,107,107,0.5)]",
    border: "border-t-2 border-t-[#FF8585]/60 border-b-2 border-b-[#a03c4a]/80",
    particle: "#FF6B6B",
    icon: Sparkles,
  },
  season: {
    bg: "bg-gradient-to-br from-[#F9D56E] via-[#F7CA4D] to-[#E5B73B]",
    track: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400",
    shadow: "shadow-[0_6px_0_0_#b8872c,0_8px_20px_rgba(249,213,110,0.3)]",
    innerShadow: "after:shadow-[inset_0_-2px_6px_rgba(0,0,0,0.2),inset_0_2px_6px_rgba(255,255,255,0.1)]",
    glow: "shadow-[0_0_20px_rgba(249,213,110,0.5)]",
    border: "border-t-2 border-t-[#FBE192]/70 border-b-2 border-b-[#b8872c]/80",
    particle: "#F9D56E",
    icon: Star,
  },
};

const sizes = {
  sm: {
    track: "h-4 rounded-full",
    fill: "h-4 rounded-full",
    text: "text-xs font-semibold",
    runner: "w-5 h-5",
  },
  md: {
    track: "h-6 rounded-xl",
    fill: "h-6 rounded-xl",
    text: "text-sm font-bold",
    runner: "w-7 h-7",
  },
  lg: {
    track: "h-8 rounded-2xl",
    fill: "h-8 rounded-2xl",
    text: "text-base font-extrabold",
    runner: "w-9 h-9",
  },
};

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function ProgressBar3D({
  current,
  max,
  label,
  showPercentage = true,
  variant = "xp",
  size = "md",
  animated = true,
  showParticles = true,
  showRunner = false,
  className = "",
}: ProgressBar3DProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [prevProgress, setPrevProgress] = useState(0);

  const currentVariant = variants[variant];
  const currentSize = sizes[size];
  const percentage = Math.min((current / max) * 100, 100);
  const Icon = currentVariant.icon;

  // 3D tilt effect
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Particle effect when progress increases
  useEffect(() => {
    if (showParticles && percentage > prevProgress && trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const newParticles: Particle[] = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: (percentage / 100) * rect.width,
        y: rect.height / 2,
      }));
      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
      }, 1000);
    }
    setPrevProgress(percentage);
  }, [percentage, prevProgress, showParticles]);

  return (
    <div className={`relative ${className}`}>
      {/* Label and Percentage */}
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className={`${currentSize.text} text-gray-700 flex items-center gap-1.5`}>
              <Icon size={size === "sm" ? 14 : size === "md" ? 16 : 18} className="text-gray-600" />
              {label}
            </span>
          )}
          {showPercentage && (
            <motion.span
              className={`${currentSize.text} text-gray-600`}
              key={percentage}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {Math.round(percentage)}%
            </motion.span>
          )}
        </div>
      )}

      {/* Progress Track */}
      <motion.div
        ref={trackRef}
        className={`
          relative w-full overflow-visible
          ${currentSize.track}
          ${currentVariant.track}
          border-2 border-gray-400/30
          shadow-[inset_0_3px_8px_rgba(0,0,0,0.15)]
        `}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotateX.get(),
          rotateY: rotateY.get(),
        }}
        transition={{
          rotateX: { type: "spring", stiffness: 200, damping: 20 },
          rotateY: { type: "spring", stiffness: 200, damping: 20 },
        }}
      >
        {/* Inner track shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent rounded-full pointer-events-none" />

        {/* Progress Fill */}
        <motion.div
          className={`
            relative overflow-hidden
            ${currentSize.fill}
            ${currentVariant.bg}
            ${currentVariant.shadow}
            ${currentVariant.border}
            ${currentVariant.innerShadow}
            after:absolute after:inset-0 after:pointer-events-none after:rounded-full
          `}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={
            animated
              ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0 }
          }
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glossy top highlight */}
          <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-full pointer-events-none" />

          {/* Bottom depth */}
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent rounded-full pointer-events-none" />

          {/* Animated shine effect */}
          {animated && (
            <motion.span
              className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
              animate={{
                x: ["-100%", "200%"],
                skewX: -15,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Pulsing glow on the edge */}
          {percentage > 0 && percentage < 100 && (
            <motion.div
              className={`absolute right-0 top-0 bottom-0 w-4 ${currentVariant.glow} rounded-r-full`}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Runner (Clai character) */}
          {showRunner && percentage > 0 && (
            <motion.div
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                ${currentSize.runner}
                bg-gradient-to-br from-[#FF6B6B] via-[#EE5A6F] to-[#D44D5C]
                rounded-full
                shadow-[0_4px_0_0_#a03c4a,0_6px_15px_rgba(255,107,107,0.4)]
                border-2 border-white
                flex items-center justify-center
                z-10
              `}
              animate={{
                y: ["-50%", "-60%", "-50%"],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Zap size={size === "sm" ? 10 : size === "md" ? 12 : 14} className="text-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Particles */}
        {showParticles &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: currentVariant.particle,
                boxShadow: `0 0 8px ${currentVariant.particle}`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
                y: [0, -20, -40],
                x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
      </motion.div>
    </div>
  );
}
