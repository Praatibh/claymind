"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef, MouseEvent, ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface Card3DProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "purple" | "gradient" | "default" | "accent";
  hover?: "lift" | "tilt" | "glow" | "none";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  badge?: {
    icon?: LucideIcon;
    text: string;
    color?: "blue" | "green" | "yellow" | "red" | "purple";
  };
  locked?: boolean;
  shine?: boolean;
}

const variants = {
  primary: {
    bg: "bg-gradient-to-br from-[#2D9CDB] via-[#2D8CDB] to-[#1D7BC0]",
    shadow: "shadow-[0_8px_0_0_#1a5c8a,0_10px_25px_rgba(45,156,219,0.3)]",
    hoverShadow: "hover:shadow-[0_12px_0_0_#1a5c8a,0_15px_35px_rgba(45,156,219,0.5)]",
    border: "border-t-4 border-t-[#3DACD9]/60 border-b-2 border-b-[#1a5c8a]/80",
    text: "text-white",
  },
  secondary: {
    bg: "bg-gradient-to-br from-white via-gray-50 to-gray-100",
    shadow: "shadow-[0_8px_0_0_#9ca3af,0_10px_25px_rgba(156,163,175,0.2)]",
    hoverShadow: "hover:shadow-[0_12px_0_0_#9ca3af,0_15px_35px_rgba(156,163,175,0.3)]",
    border: "border-t-4 border-t-white/80 border-b-2 border-b-gray-400/60",
    text: "text-gray-800",
  },
  success: {
    bg: "bg-gradient-to-br from-[#4ECDC4] via-[#45B8AF] to-[#3BA39A]",
    shadow: "shadow-[0_8px_0_0_#2a7972,0_10px_25px_rgba(78,205,196,0.3)]",
    hoverShadow: "hover:shadow-[0_12px_0_0_#2a7972,0_15px_35px_rgba(78,205,196,0.5)]",
    border: "border-t-4 border-t-[#6FD9D1]/60 border-b-2 border-b-[#2a7972]/80",
    text: "text-white",
  },
  warning: {
    bg: "bg-gradient-to-br from-[#F9D56E] via-[#F7CA4D] to-[#E5B73B]",
    shadow: "shadow-[0_8px_0_0_#b8872c,0_10px_25px_rgba(249,213,110,0.3)]",
    hoverShadow: "hover:shadow-[0_12px_0_0_#b8872c,0_15px_35px_rgba(249,213,110,0.5)]",
    border: "border-t-4 border-t-[#FBE192]/70 border-b-2 border-b-[#b8872c]/80",
    text: "text-gray-800",
  },
  purple: {
    bg: "bg-gradient-to-br from-[#A78BFA] via-[#9333EA] to-[#7E22CE]",
    shadow: "shadow-[0_8px_0_0_#581c87,0_10px_25px_rgba(147,51,234,0.3)]",
    hoverShadow: "hover:shadow-[0_12px_0_0_#581c87,0_15px_35px_rgba(147,51,234,0.5)]",
    border: "border-t-4 border-t-[#C4B5FD]/60 border-b-2 border-b-[#581c87]/80",
    text: "text-white",
  },
  gradient: {
    bg: "bg-gradient-to-br from-[#FF6B6B] via-[#4ECDC4] to-[#A78BFA]",
    shadow: "shadow-[0_8px_0_0_#581c87,0_10px_25px_rgba(167,139,250,0.3)]",
    hoverShadow: "hover:shadow-[0_12px_0_0_#581c87,0_15px_35px_rgba(167,139,250,0.5)]",
    border: "border-t-4 border-t-white/40 border-b-2 border-b-[#581c87]/80",
    text: "text-white",
  },
  default: {
    bg: "bg-white",
    shadow: "shadow-[0_8px_0_0_#d1d5db,0_10px_25px_rgba(0,0,0,0.1)]",
    hoverShadow: "hover:shadow-[0_12px_0_0_#d1d5db,0_15px_35px_rgba(0,0,0,0.15)]",
    border: "border-t-4 border-t-gray-100 border-b-2 border-b-gray-300/60",
    text: "text-gray-900",
  },
  accent: {
    bg: "bg-gradient-to-br from-[#9B59B6] via-[#8E44AD] to-[#7D3C98]",
    shadow: "shadow-[0_8px_0_0_#5e2d6e,0_10px_25px_rgba(155,89,182,0.4)]",
    hoverShadow: "hover:shadow-[0_12px_0_0_#5e2d6e,0_15px_35px_rgba(155,89,182,0.6)]",
    border: "border-t-4 border-t-[#B370CF]/60 border-b-2 border-b-[#5e2d6e]/80",
    text: "text-white",
  },
};

const sizes = {
  sm: "p-4 rounded-xl gap-3",
  md: "p-6 rounded-2xl gap-4",
  lg: "p-8 rounded-3xl gap-5",
};

const badgeColors = {
  blue: "bg-gradient-to-br from-[#2D9CDB] to-[#1D7BC0] shadow-[0_2px_0_0_#1a5c8a]",
  green: "bg-gradient-to-br from-[#4ECDC4] to-[#3BA39A] shadow-[0_2px_0_0_#2a7972]",
  yellow: "bg-gradient-to-br from-[#F9D56E] to-[#E5B73B] shadow-[0_2px_0_0_#b8872c]",
  red: "bg-gradient-to-br from-[#FF6B6B] to-[#D44D5C] shadow-[0_2px_0_0_#a03c4a]",
  purple: "bg-gradient-to-br from-[#A78BFA] to-[#7E22CE] shadow-[0_2px_0_0_#581c87]",
};

export function Card3D({
  children,
  variant = "secondary",
  hover = "tilt",
  size = "md",
  className = "",
  onClick,
  badge,
  locked = false,
  shine = true,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  // 3D tilt effect
  const rotateX = useTransform(mouseY, [-0.5, 0.5], hover === "tilt" ? [12, -12] : [0, 0]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], hover === "tilt" ? [-12, 12] : [0, 0]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || hover === "none" || locked) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getHoverAnimation = () => {
    if (locked) return {};
    switch (hover) {
      case "lift":
        return { y: -8, transition: { duration: 0.2, ease: "easeOut" } };
      case "glow":
        return { scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative flex flex-col
        ${currentVariant.bg}
        ${currentVariant.shadow}
        ${!locked && currentVariant.hoverShadow}
        ${currentVariant.border}
        ${currentSize}
        ${currentVariant.text}
        ${onClick && !locked ? "cursor-pointer" : ""}
        ${locked ? "opacity-60" : ""}
        ${className}
        overflow-hidden
        transform-gpu
        transition-shadow duration-300
        after:absolute after:inset-0 after:pointer-events-none after:rounded-[inherit]
        after:shadow-[inset_0_-3px_10px_rgba(0,0,0,0.2),inset_0_3px_10px_rgba(255,255,255,0.1)]
      `}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={!locked ? onClick : undefined}
      whileHover={getHoverAnimation()}
      animate={{
        rotateX: !locked ? rotateX.get() : 0,
        rotateY: !locked ? rotateY.get() : 0,
      }}
      transition={{
        rotateX: { type: "spring", stiffness: 200, damping: 20 },
        rotateY: { type: "spring", stiffness: 200, damping: 20 },
      }}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-3 right-3 z-20">
          <div
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full
              ${badgeColors[badge.color || "blue"]}
              text-white text-xs font-bold
              border-t border-white/30
            `}
          >
            {badge.icon && <badge.icon size={12} />}
            <span>{badge.text}</span>
          </div>
        </div>
      )}

      {/* Locked overlay */}
      {locked && (
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] z-10 rounded-[inherit] flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-white/90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-sm font-bold text-white/90">Locked</p>
          </div>
        </div>
      )}

      {/* Glossy top highlight */}
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-[inherit] pointer-events-none z-[5]" />

      {/* Bottom depth shadow */}
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent rounded-b-[inherit] pointer-events-none z-[5]" />

      {/* Shine animation */}
      {shine && !locked && (
        <motion.span
          className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-[5]"
          animate={{
            x: ["-100%", "200%"],
            skewX: -15,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Hover glow overlay */}
      {hover === "glow" && !locked && (
        <span
          className="
            absolute inset-0 pointer-events-none z-[5] rounded-[inherit]
            bg-gradient-to-t from-transparent via-white/5 to-white/20
            opacity-0 hover:opacity-100 transition-opacity duration-300
          "
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
