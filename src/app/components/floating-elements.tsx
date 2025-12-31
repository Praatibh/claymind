import { motion } from "motion/react";
import { Sparkles, Star, Heart, Zap } from "lucide-react";

export function FloatingElements() {
  const elements = [
    { Icon: Sparkles, x: "10%", y: "20%", delay: 0, color: "text-amber-400" },
    { Icon: Star, x: "85%", y: "15%", delay: 0.5, color: "text-purple-400" },
    { Icon: Heart, x: "90%", y: "70%", delay: 1, color: "text-pink-400" },
    { Icon: Zap, x: "5%", y: "80%", delay: 1.5, color: "text-violet-400" },
    { Icon: Sparkles, x: "50%", y: "10%", delay: 2, color: "text-blue-400" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className={`absolute ${element.color}`}
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            y: [0, -50, -100],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeOut",
          }}
        >
          <element.Icon className="w-8 h-8" />
        </motion.div>
      ))}
    </div>
  );
}
