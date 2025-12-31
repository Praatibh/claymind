import { motion } from "motion/react";
import { ReactNode } from "react";

interface NavIconProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * Production-level navigation icon with accessibility and animation improvements
 */
export function NavIcon({ icon, label, active = false, onClick }: NavIconProps) {
  return (
    <motion.button
      className={`
        flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white
        relative group overflow-hidden
        ${active
          ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-[0_4px_15px_rgba(124,58,237,0.4)]'
          : 'bg-white text-gray-600 hover:bg-purple-50 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
        }
      `}
      whileHover={{
        y: -3,
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      onClick={onClick}
      aria-label={`${active ? 'Current page: ' : 'Navigate to '}${label}`}
      aria-current={active ? 'page' : undefined}
      role="menuitem"
    >
      {/* Background glow effect for active state */}
      {active && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-700 rounded-2xl opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Icon container with improved animation */}
      <motion.div
        className={`relative z-10 ${active ? 'text-white' : 'text-purple-500 group-hover:text-purple-600'} transition-colors duration-200`}
        whileHover={!active ? {
          scale: 1.1,
          transition: { duration: 0.2 }
        } : {}}
      >
        {icon}
      </motion.div>
      
      {/* Label with better typography */}
      <span className={`text-xs font-medium relative z-10 transition-colors duration-200 ${
        active ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
      }`}>
        {label}
      </span>
    </motion.button>
  );
}
