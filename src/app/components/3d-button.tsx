import { motion, useMotionValue, useTransform } from "motion/react";
import { ReactNode, useRef, MouseEvent, useState, useCallback } from "react";
import { buttonClickFeedback, buttonHoverFeedback, successFeedback, errorFeedback } from "../utils/haptics-sound";

interface Button3DProps {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: "primary" | "secondary" | "accent" | "success" | "danger" | "fun" | "outline" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  glow?: boolean;
  shine?: boolean;
  pulse?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function Button3D({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  className = "",
  glow = true,
  shine = true,
  pulse = false,
  loading = false,
  ariaLabel,
  type = "button"
}: Button3DProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // 3D tilt effect based on mouse position
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    if (!disabled && !loading) {
      buttonHoverFeedback();
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Trigger haptic and sound feedback
    if (variant === "success") {
      successFeedback();
    } else if (variant === "danger") {
      errorFeedback();
    } else {
      buttonClickFeedback();
    }

    // Create ripple effect
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setRipples((prev) => [...prev, { x, y, id: Date.now() }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
    }

    // Call user's onClick handler
    onClick?.();
  };

  // Enhanced realistic variants with proper depth and lighting
  const variants = {
    primary: {
      bg: "bg-gradient-to-br from-[#2D9CDB] via-[#2D8CDB] to-[#1D7BC0]",
      shadow: "shadow-[0_8px_0_0_#1a5c8a,0_10px_25px_rgba(45,156,219,0.4)]",
      hoverShadow: "hover:shadow-[0_6px_0_0_#1a5c8a,0_12px_35px_rgba(45,156,219,0.6)]",
      activeShadow: "active:shadow-[0_2px_0_0_#1a5c8a,0_4px_15px_rgba(45,156,219,0.5)]",
      text: "text-white",
      border: "border-t-4 border-t-[#3DACD9]/60 border-b-2 border-b-[#1a5c8a]/80",
      glow: glow ? "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:via-white/10 before:to-white/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300" : "",
      innerShadow: "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_-2px_8px_rgba(0,0,0,0.2),inset_0_2px_8px_rgba(255,255,255,0.1)]"
    },
    secondary: {
      bg: "bg-gradient-to-br from-[#FF6B6B] via-[#EE5A6F] to-[#D44D5C]",
      shadow: "shadow-[0_8px_0_0_#a03c4a,0_10px_25px_rgba(255,107,107,0.4)]",
      hoverShadow: "hover:shadow-[0_6px_0_0_#a03c4a,0_12px_35px_rgba(255,107,107,0.6)]",
      activeShadow: "active:shadow-[0_2px_0_0_#a03c4a,0_4px_15px_rgba(255,107,107,0.5)]",
      text: "text-white",
      border: "border-t-4 border-t-[#FF8585]/60 border-b-2 border-b-[#a03c4a]/80",
      glow: glow ? "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:via-white/10 before:to-white/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300" : "",
      innerShadow: "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_-2px_8px_rgba(0,0,0,0.2),inset_0_2px_8px_rgba(255,255,255,0.1)]"
    },
    accent: {
      bg: "bg-gradient-to-br from-[#9B59B6] via-[#8E44AD] to-[#7D3C98]",
      shadow: "shadow-[0_8px_0_0_#5e2d6e,0_10px_25px_rgba(155,89,182,0.4)]",
      hoverShadow: "hover:shadow-[0_6px_0_0_#5e2d6e,0_12px_35px_rgba(155,89,182,0.6)]",
      activeShadow: "active:shadow-[0_2px_0_0_#5e2d6e,0_4px_15px_rgba(155,89,182,0.5)]",
      text: "text-white",
      border: "border-t-4 border-t-[#B370CF]/60 border-b-2 border-b-[#5e2d6e]/80",
      glow: glow ? "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:via-white/10 before:to-white/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300" : "",
      innerShadow: "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_-2px_8px_rgba(0,0,0,0.2),inset_0_2px_8px_rgba(255,255,255,0.1)]"
    },
    success: {
      bg: "bg-gradient-to-br from-[#4ECDC4] via-[#45B8AF] to-[#3BA39A]",
      shadow: "shadow-[0_8px_0_0_#2a7972,0_10px_25px_rgba(78,205,196,0.4)]",
      hoverShadow: "hover:shadow-[0_6px_0_0_#2a7972,0_12px_35px_rgba(78,205,196,0.6)]",
      activeShadow: "active:shadow-[0_2px_0_0_#2a7972,0_4px_15px_rgba(78,205,196,0.5)]",
      text: "text-white",
      border: "border-t-4 border-t-[#6FD9D1]/60 border-b-2 border-b-[#2a7972]/80",
      glow: glow ? "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:via-white/10 before:to-white/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300" : "",
      innerShadow: "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_-2px_8px_rgba(0,0,0,0.2),inset_0_2px_8px_rgba(255,255,255,0.1)]"
    },
    danger: {
      bg: "bg-gradient-to-br from-[#E74C3C] via-[#C0392B] to-[#A93226]",
      shadow: "shadow-[0_8px_0_0_#7f2417,0_10px_25px_rgba(231,76,60,0.4)]",
      hoverShadow: "hover:shadow-[0_6px_0_0_#7f2417,0_12px_35px_rgba(231,76,60,0.6)]",
      activeShadow: "active:shadow-[0_2px_0_0_#7f2417,0_4px_15px_rgba(231,76,60,0.5)]",
      text: "text-white",
      border: "border-t-4 border-t-[#EC7063]/60 border-b-2 border-b-[#7f2417]/80",
      glow: glow ? "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:via-white/10 before:to-white/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300" : "",
      innerShadow: "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_-2px_8px_rgba(0,0,0,0.2),inset_0_2px_8px_rgba(255,255,255,0.1)]"
    },
    fun: {
      bg: "bg-gradient-to-br from-[#F9D56E] via-[#F7CA4D] to-[#E5B73B]",
      shadow: "shadow-[0_8px_0_0_#b8872c,0_10px_25px_rgba(249,213,110,0.5)]",
      hoverShadow: "hover:shadow-[0_6px_0_0_#b8872c,0_12px_35px_rgba(249,213,110,0.7)]",
      activeShadow: "active:shadow-[0_2px_0_0_#b8872c,0_4px_15px_rgba(249,213,110,0.6)]",
      text: "text-[#1A1F3A]",
      border: "border-t-4 border-t-[#FBE192]/70 border-b-2 border-b-[#b8872c]/80",
      glow: glow ? "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-t before:from-transparent before:via-white/10 before:to-white/40 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300" : "",
      innerShadow: "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_-2px_8px_rgba(0,0,0,0.15),inset_0_2px_8px_rgba(255,255,255,0.2)]"
    },
    outline: {
      bg: "bg-transparent",
      shadow: "shadow-[0_4px_0_0_#9ca3af,0_6px_15px_rgba(156,163,175,0.2)]",
      hoverShadow: "hover:shadow-[0_6px_0_0_#9ca3af,0_8px_20px_rgba(156,163,175,0.3)]",
      activeShadow: "active:shadow-[0_2px_0_0_#9ca3af,0_3px_10px_rgba(156,163,175,0.25)]",
      text: "text-gray-700",
      border: "border-2 border-gray-400",
      glow: "",
      innerShadow: ""
    },
    glass: {
      bg: "bg-white/20 backdrop-blur-md",
      shadow: "shadow-[0_8px_0_0_rgba(255,255,255,0.3),0_10px_25px_rgba(0,0,0,0.1)]",
      hoverShadow: "hover:shadow-[0_6px_0_0_rgba(255,255,255,0.4),0_12px_35px_rgba(0,0,0,0.15)]",
      activeShadow: "active:shadow-[0_2px_0_0_rgba(255,255,255,0.3),0_4px_15px_rgba(0,0,0,0.1)]",
      text: "text-white",
      border: "border-t-4 border-t-white/40 border-b-2 border-b-white/20",
      glow: glow ? "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-t before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300" : "",
      innerShadow: "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_-2px_8px_rgba(0,0,0,0.1),inset_0_2px_8px_rgba(255,255,255,0.2)]"
    }
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm rounded-xl gap-2 font-semibold",
    md: "px-7 py-3.5 text-base rounded-2xl gap-2.5 font-bold",
    lg: "px-9 py-4 text-lg rounded-2xl gap-3 font-bold",
    xl: "px-12 py-5 text-xl rounded-3xl gap-3.5 font-extrabold",
  };

  const currentVariant = variants[variant];

  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative flex items-center justify-center
        transition-all duration-200 ease-out
        transform-gpu
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30
        ${currentVariant.bg}
        ${currentVariant.shadow}
        ${currentVariant.hoverShadow}
        ${currentVariant.activeShadow}
        ${currentVariant.text}
        ${currentVariant.border}
        ${currentVariant.glow}
        ${currentVariant.innerShadow}
        ${sizes[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer hover:opacity-90'}
        ${className}
        select-none
        overflow-hidden
      `}
      onClick={handleClick}
      onMouseMove={!disabled && !loading ? handleMouseMove : undefined}
      onMouseLeave={!disabled && !loading ? handleMouseLeave : undefined}
      onMouseEnter={handleMouseEnter}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-disabled={disabled || loading}
      type={type}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      whileHover={!disabled && !loading ? {
        y: -3,
        transition: { duration: 0.15, ease: "easeOut" }
      } : undefined}
      whileTap={!disabled && !loading ? {
        y: 6,
        scale: 0.98,
        transition: { duration: 0.1, ease: "easeIn" }
      } : undefined}
      animate={{
        rotateX: !disabled && !loading ? rotateX.get() : 0,
        rotateY: !disabled && !loading ? rotateY.get() : 0,
        scale: pulse && !disabled && !loading ? [1, 1.05, 1] : 1,
      }}
      transition={{
        rotateX: { type: "spring", stiffness: 200, damping: 20 },
        rotateY: { type: "spring", stiffness: 200, damping: 20 },
        scale: pulse ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : undefined,
      }}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 15, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Shine effect overlay */}
      {shine && !disabled && !loading && (
        <span className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
          <span
            className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"
            style={{
              transform: "translateX(-100%)",
              animation: "shine 3s ease-in-out infinite"
            }}
          />
        </span>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-[inherit]">
        {loading ? (
          <svg
            className="animate-spin"
            width={size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 24 : 28}
            height={size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 24 : 28}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {icon && (
              <motion.span
                className="flex-shrink-0"
                whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
              >
                {icon}
              </motion.span>
            )}
            <span className="leading-none">{children}</span>
          </>
        )}
      </span>

      {/* Glossy top highlight */}
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-[inherit] pointer-events-none" />

      {/* Bottom depth */}
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent rounded-b-[inherit] pointer-events-none" />
    </motion.button>
  );
}

// CSS for shine animation (add to global styles or component)
const styles = `
  @keyframes shine {
    0% {
      transform: translateX(-100%) skewX(-15deg);
    }
    100% {
      transform: translateX(200%) skewX(-15deg);
    }
  }

  .animate-shine {
    animation: shine 3s ease-in-out infinite;
  }
`;

// Export styles to be added to global CSS
export const buttonStyles = styles;
