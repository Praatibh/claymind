import { motion } from "motion/react";
import { ReactNode } from "react";

interface Badge3DProps {
  icon: ReactNode;
  label: string;
  unlocked?: boolean;
  color?: "purple" | "amber" | "pink" | "blue" | "green";
}

export function Badge3D({ icon, label, unlocked = true, color = "purple" }: Badge3DProps) {
  const colors = {
    purple: "from-purple-400 to-purple-600",
    amber: "from-amber-400 to-amber-600",
    pink: "from-pink-400 to-pink-600",
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      whileHover={unlocked ? { y: -5, scale: 1.1 } : undefined}
    >
      <motion.div
        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${unlocked ? colors[color] : 'from-gray-300 to-gray-400'} shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-center relative`}
        animate={unlocked ? { 
          rotate: [0, -5, 5, -5, 0],
        } : undefined}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        <div className={`text-white ${unlocked ? '' : 'opacity-40'}`}>
          {icon}
        </div>
        
        {!unlocked && (
          <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <div className="w-3 h-4 border-2 border-white rounded-sm" />
            </div>
          </div>
        )}
      </motion.div>
      
      <span className={`text-sm text-center ${unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
        {label}
      </span>
    </motion.div>
  );
}
