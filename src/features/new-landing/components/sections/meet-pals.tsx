import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * MeetPals Component
 * 
 * Clones the "Meet the PALs" section showcasing various communication modalities
 * like Voice, Chat, and Face-to-Face Video within a floating UI layout.
 * Adheres to the retro-futurism aesthetic with OS window styling and brutalist shadows.
 */
const MeetPals: React.FC = () => {
  const constraintsRef = useRef(null);

  return (
    <section className="relative py-[120px] overflow-hidden bg-[#F1EEE9]">
      {/* Background Radial Dither Effect (Simulated via image from assets) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <img 
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/6904e869318bdad26e1f1167_meet-radial-16.avif" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

        <div className="container relative z-10 flex flex-col items-center text-center">
          {/* Section Heading */}
          <h2 className="mb-4 text-[#000000] font-display text-[64px] leading-[1.1]">
            Meet your AI Learning Buddies.
          </h2>
          <p className="max-w-[600px] mb-12 text-[#808080] font-sans text-[20px] leading-[1.5]">
            Fun, friendly AI characters that help you learn math, science, and coding through interactive play.
            <br />
            Ask them anything. Play games. Or just chat.
          </p>

        {/* Floating UI Layout Area */}
        <div ref={constraintsRef} className="relative w-full max-w-[1100px] h-[600px] mt-8 flex items-center justify-center">
          
          {/* 1. Main Face-to-Face Video Window (Center) */}
          <motion.div 
            drag
            dragConstraints={constraintsRef}
            whileDrag={{ scale: 1.02, zIndex: 50 }}
            className="absolute z-30 w-[480px] os-window transform -translate-y-4 cursor-grab active:cursor-grabbing"
          >
            <div className="os-window-header flex justify-between items-center bg-white h-[32px] px-3 border-b border-black">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#FF6B8B]" />
                <span className="font-ui-mono text-[10px] tracking-wider">FACE-TO-FACE VIDEO</span>
              </div>
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-[10px] h-[1px] bg-black opacity-20" />
                ))}
              </div>
            </div>
            <div className="p-1 bg-black aspect-video relative overflow-hidden pointer-events-none">
               <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68ee11332e6ba397448a7c58_v2-img-14.avif"
                alt="PAL Video"
                className="w-full h-full object-cover grayscale-[20%]"
              />
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-4 pointer-events-auto">
                <button className="w-10 h-10 bg-white border border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                  <span className="text-[14px]">💬</span>
                </button>
                <button className="w-10 h-10 bg-white border border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                  <span className="text-[14px]">📹</span>
                </button>
                <button className="w-10 h-10 bg-white border border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                  <span className="text-[14px]">📞</span>
                </button>
              </div>
            </div>
          </motion.div>

            {/* 2. Chat Bubble (Bottom Left) */}
            <motion.div 
              drag
              dragConstraints={constraintsRef}
              whileDrag={{ scale: 1.02, zIndex: 50 }}
              className="absolute z-40 left-[-20px] bottom-[40px] w-[340px] os-window cursor-grab active:cursor-grabbing"
            >
              <div className="os-window-header flex items-center gap-2 bg-white h-[28px] px-3 border-b border-black">
                <div className="w-2 h-2 bg-[#39E17F]" />
                <span className="font-ui-mono text-[10px]">CHAT</span>
              </div>
              <div className="p-4 bg-white">
                <div className="mb-4">
                  <p className="bg-[#F7F4EF] border border-black p-3 text-[13px] leading-snug">
                    How do robots work? Can you explain it like I'm 8?
                  </p>
                </div>
                <div className="border border-black p-2 bg-[#F1EEE9]">
                  <span className="font-ui-mono text-[9px] text-[#808080]">ASK A QUESTION...</span>
                </div>
              </div>
            </motion.div>

          {/* 3. Voice Window (Bottom Right) */}
          <motion.div 
            drag
            dragConstraints={constraintsRef}
            whileDrag={{ scale: 1.02, zIndex: 50 }}
            className="absolute z-40 right-[-10px] bottom-[180px] w-[320px] os-window cursor-grab active:cursor-grabbing"
          >
            <div className="os-window-header flex items-center gap-2 bg-white h-[28px] px-3 border-b border-black">
              <div className="w-2 h-2 bg-[#FFB86C]" />
              <span className="font-ui-mono text-[10px]">VOICE</span>
            </div>
            <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-4 border border-black p-1">
                    <div className="flex items-center gap-2 px-2">
                        <span className="text-[12px]">🔊</span>
                        <div className="w-24 h-2 bg-black"></div>
                    </div>
                    <button className="bg-[#39E17F] border-l border-black px-4 py-1 font-ui-mono text-[10px] font-bold">
                        LISTEN
                    </button>
                </div>
                <div className="flex justify-center items-center py-2 h-24 overflow-hidden pointer-events-none">
                    <img 
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/690c959a23ddc18ac3385d88_voice-15.avif" 
                        alt="Voice Waveform"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 flex flex-col items-center">
            <h3 className="text-[20px] font-sans font-normal mb-6 text-[#000]">
                Your new tutor, teammate, and friend.
            </h3>
            <Link
                to="/signup"
                className="brutal-btn inline-block bg-[#FF6B8B] text-black text-[14px] px-8 py-3 tracking-widest font-bold border-2 border-black shadow-[6px_6px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
            >
                START LEARNING
            </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetPals;