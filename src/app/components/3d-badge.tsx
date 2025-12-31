"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef, MouseEvent } from "react";
import { LucideIcon, Star, Sparkles, Crown, Zap, Trophy, Target } from "lucide-react";

interface Badge3DProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  rarity?: "common" | "rare" | "epic" | "legendary" | "mythic";
  size?: "sm" | "md" | "lg";
  earned?: boolean;
  progress?: number; // 0-100
  className?: string;
  onClick?: () => void;
  showShine?: boolean;
  showPulse?: boolean;
}

const rarities = {
  common: {
    bg: "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600",
    shadow: "shadow-[0_6px_0_0_#374151,0_8px_20px_rgba(107,114,128,0.3)]",
    hoverShadow: "hover:shadow-[0_8px_0_0_#374151,0_12px_30px_rgba(107,114,128,0.5)]",
    border: "border-t-4 border-t-gray-300/60 border-b-2 border-b-gray-700/80",
    ring: "ring-4 ring-gray-400/30",
    glow: "shadow-[0_0_30px_rgba(107,114,128,0.6)]",
    particle: "#9CA3AF",
    icon: Star,
  },
  rare: {
    bg: "bg-gradient-to-br from-[#2D9CDB] via-[#2D8CDB] to-[#1D7BC0]",
    shadow: "shadow-[0_6px_0_0_#1a5c8a,0_8px_20px_rgba(45,156,219,0.3)]",
    hoverShadow: "hover:shadow-[0_8px_0_0_#1a5c8a,0_12px_30px_rgba(45,156,219,0.6)]",
    border: "border-t-4 border-t-[#3DACD9]/60 border-b-2 border-b-[#1a5c8a]/80",
    ring: "ring-4 ring-[#2D9CDB]/30",
    glow: "shadow-[0_0_30px_rgba(45,156,219,0.6)]",
    particle: "#2D9CDB",
    icon: Sparkles,
  },
  epic: {
    bg: "bg-gradient-to-br from-[#A78BFA] via-[#9333EA] to-[#7E22CE]",
    shadow: "shadow-[0_6px_0_0_#581c87,0_8px_20px_rgba(147,51,234,0.3)]",
    hoverShadow: "hover:shadow-[0_8px_0_0_#581c87,0_12px_30px_rgba(147,51,234,0.6)]",
    border: "border-t-4 border-t-[#C4B5FD]/60 border-b-2 border-b-[#581c87]/80",
    ring: "ring-4 ring-purple-500/40",
    glow: "shadow-[0_0_30px_rgba(147,51,234,0.7)]",
    particle: "#A78BFA",
    icon: Crown,
  },
  legendary: {
    bg: "bg-gradient-to-br from-[#F9D56E] via-[#F7CA4D] to-[#E5B73B]",
    shadow: "shadow-[0_6px_0_0_#b8872c,0_8px_20px_rgba(249,213,110,0.4)]",
    hoverShadow: "hover:shadow-[0_8px_0_0_#b8872c,0_12px_30px_rgba(249,213,110,0.7)]",
    border: "border-t-4 border-t-[#FBE192]/70 border-b-2 border-b-[#b8872c]/80",
    ring: "ring-4 ring-yellow-400/50",
    glow: "shadow-[0_0_40px_rgba(249,213,110,0.8)]",
    particle: "#F9D56E",
    icon: Trophy,
  },
  mythic: {
    bg: "bg-gradient-to-br from-[#FF6B6B] via-[#A78BFA] to-[#4ECDC4]",
    shadow: "shadow-[0_6px_0_0_#581c87,0_8px_20px_rgba(255,107,107,0.4)]",
    hoverShadow: "hover:shadow-[0_8px_0_0_#581c87,0_12px_30px_rgba(255,107,107,0.7)]",
    border: "border-t-4 border-t-white/60 border-b-2 border-b-[#581c87]/80",
    ring: "ring-4 ring-pink-400/50",
    glow: "shadow-[0_0_50px_rgba(255,107,107,0.9)]",
    particle: "#FF6B6B",
    icon: Zap,
  },
};

const sizes = {
  sm: {
    container: "w-20 h-20",
    icon: 24,
    text: "text-xs",
    title: "text-[10px]",
  },
  md: {
    container: "w-28 h-28",
    icon: 32,
    text: "text-sm",
    title: "text-xs",
  },
  lg: {
    container: "w-36 h-36",
    icon: 40,
    text: "text-base",
    title: "text-sm",
  },
};

export function Badge3D({
  icon,
  title,
  description,
  rarity = "common",
  size = "md",
  earned = false,
  progress,
  className = "",
  onClick,
  showShine = true,
  showPulse = false,
}: Badge3DProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const currentRarity = rarities[rarity];
  const currentSize = sizes[size];
  const Icon = icon || currentRarity.icon;

  // 3D tilt effect
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current || !earned) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Badge */}
      <motion.div
        ref={badgeRef}
        className={`
          relative
          ${currentSize.container}
          rounded-full
          ${earned ? currentRarity.bg : "bg-gradient-to-br from-gray-300 to-gray-400"}
          ${earned ? currentRarity.shadow : "shadow-[0_6px_0_0_#6b7280,0_8px_20px_rgba(107,114,128,0.2)]"}
          ${earned ? currentRarity.hoverShadow : ""}
          ${earned ? currentRarity.border : "border-t-4 border-t-gray-200/60 border-b-2 border-b-gray-500/80"}
          ${earned ? currentRarity.ring : "ring-4 ring-gray-300/20"}
          ${earned && onClick ? "cursor-pointer" : ""}
          ${!earned ? "opacity-40 grayscale" : ""}
          overflow-hidden
          transform-gpu
          transition-shadow duration-300
          flex items-center justify-center
          after:absolute after:inset-0 after:pointer-events-none after:rounded-full
          after:shadow-[inset_0_-3px_12px_rgba(0,0,0,0.3),inset_0_3px_12px_rgba(255,255,255,0.2)]
        `}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={earned ? onClick : undefined}
        whileHover={
          earned
            ? { scale: 1.1, y: -4, transition: { duration: 0.2, ease: "easeOut" } }
            : undefined
        }
        whileTap={earned ? { scale: 0.95 } : undefined}
        animate={{
          rotateX: earned ? rotateX.get() : 0,
          rotateY: earned ? rotateY.get() : 0,
        }}
        transition={{
          rotateX: { type: "spring", stiffness: 200, damping: 20 },
          rotateY: { type: "spring", stiffness: 200, damping: 20 },
        }}
      >
        {/* Pulsing glow for legendary/mythic */}
        {earned && showPulse && (rarity === "legendary" || rarity === "mythic") && (
          <motion.div
            className={`absolute inset-0 rounded-full ${currentRarity.glow}`}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Glossy top highlight */}
        <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none z-[5]" />

        {/* Bottom depth shadow */}
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent rounded-b-full pointer-events-none z-[5]" />

        {/* Shine animation */}
        {showShine && earned && (
          <motion.span
            className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-[5]"
            animate={{
              x: ["-100%", "200%"],
              skewX: -15,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Icon */}
        <div className="relative z-10">
          <Icon
            size={currentSize.icon}
            className={`${earned ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" : "text-gray-500"}`}
            strokeWidth={2.5}
          />
        </div>

        {/* Lock icon for unearned badges */}
        {!earned && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        )}

        {/* Progress ring */}
        {!earned && progress !== undefined && progress > 0 && (
          <svg className="absolute inset-0 w-full h-full -rotate-90 z-[15]">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                strokeDasharray: "0 1",
              }}
            />
          </svg>
        )}
      </motion.div>

      {/* Title and Description */}
      <div className="text-center max-w-[140px]">
        <h3
          className={`${currentSize.title} font-bold ${earned ? "text-gray-800" : "text-gray-500"} leading-tight`}
        >
          {title}
        </h3>
        {description && (
          <p className={`text-[10px] text-gray-600 mt-0.5 leading-tight`}>{description}</p>
        )}
        {!earned && progress !== undefined && (
          <p className="text-[10px] text-gray-500 mt-1 font-semibold">{progress}%</p>
        )}
      </div>
    </div>
  );
}

// Badge Grid Component for displaying multiple badges
interface BadgeGrid3DProps {
  badges: Array<{
    id: string;
    icon?: LucideIcon;
    title: string;
    description?: string;
    rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
    earned: boolean;
    progress?: number;
  }>;
  size?: "sm" | "md" | "lg";
  columns?: 3 | 4 | 5 | 6;
  onBadgeClick?: (badgeId: string) => void;
}

export function BadgeGrid3D({
  badges,
  size = "md",
  columns = 4,
  onBadgeClick,
}: BadgeGrid3DProps) {
  const gridCols = {
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <Badge3D
            icon={badge.icon}
            title={badge.title}
            description={badge.description}
            rarity={badge.rarity}
            size={size}
            earned={badge.earned}
            progress={badge.progress}
            onClick={() => onBadgeClick?.(badge.id)}
            showPulse={badge.rarity === "legendary" || badge.rarity === "mythic"}
          />
        </motion.div>
      ))}
    </div>
  );
}
