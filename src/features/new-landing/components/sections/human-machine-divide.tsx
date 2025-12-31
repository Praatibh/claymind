import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Zap, Coins } from 'lucide-react';

const HumanMachineDivide = () => {
  const [typedText, setTypedText] = useState('tutor');
  const words = ['tutor', 'teammate', 'friend', 'mentor'];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex % words.length];
      if (isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        setSpeed(50);
      } else {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
        setSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex, speed]);

  return (
    <section className="relative overflow-hidden bg-[#F1EEE9] py-[120px] px-[1.5rem]">
      {/* Background Cloud Image Art */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68f0e0628f97ea257bd5dd30_art-7.avif"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-[1280px]">
        {/* Animated Heading */}
            <div className="text-center mb-[60px]">
              <h2 className="font-display text-[1.4rem] sm:text-[2rem] md:text-[4rem] leading-[1.2] text-black whitespace-nowrap">
                What if your child could learn from a{' '}
                <span className="italic relative inline-block min-w-[3.5em] text-left">
                  {typedText}
                  <span className="w-[2px] h-[0.9em] bg-black inline-block align-middle ml-1 animate-[pulse_1s_infinite]"></span>
                </span>
                {' '}?
              </h2>
              <div className="mt-4">

              <p className="font-ui-mono text-[12px] tracking-wider text-black flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-[#FF6B8B]"></span>
                Education redefined for the AI era
              </p>
            </div>
          </div>

        {/* Interactive Composition */}
        <div className="relative flex justify-center items-center h-[500px]">
          {/* Central Window */}
          <div className="relative z-20 w-[600px] h-[350px] bg-[#F7F4EF] border border-black shadow-brutal overflow-hidden">
            {/* Window Header */}
            <div className="h-8 border-bottom border-black flex items-center px-3 bg-white gap-2">
              <div className="w-3 h-3 bg-[#FFB86B]"></div>
              <span className="font-ui-mono text-[10px] text-black uppercase">BRIDGING THE HUMAN-MACHINE DIVIDE</span>
              <div className="flex-grow flex gap-1 px-4">
                <div className="h-[1px] bg-black/10 w-full"></div>
                <div className="h-[1px] bg-black/10 w-full"></div>
                <div className="h-[1px] bg-black/10 w-full"></div>
              </div>
              <div className="flex gap-1">
                <div className="w-3 h-3 border border-black"></div>
                <div className="w-3 h-3 border border-black bg-black"></div>
              </div>
            </div>

            {/* Window Body with Dithered Cloud Art */}
            <div className="relative w-full h-[calc(100%-32px)] overflow-hidden">
              <div className="absolute inset-0 bg-[#E4E2F4] flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative z-10"
                >
                  <div className="relative">
                    <Brain size={120} className="text-[#FF6B8B] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
                  </div>
                  
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px]"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                      <Cpu size={36} className="text-[#4E5FFD] bg-white border-2 border-black p-1.5 shadow-brutal-sm" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                      <Zap size={36} className="text-[#39E17F] bg-white border-2 border-black p-1.5 shadow-brutal-sm" />
                    </div>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2">
                      <Coins size={36} className="text-yellow-500 bg-white border-2 border-black p-1.5 shadow-brutal-sm" />
                    </div>
                    <div className="absolute top-1/2 right-0 -translate-y-1/2">
                      <div className="w-8 h-8 bg-[#FF6B8B] border-2 border-black rotate-45 flex items-center justify-center shadow-brutal-sm">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Dithered Particles */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-black/10"
                    initial={{ 
                      x: Math.random() * 600 - 300, 
                      y: Math.random() * 400 - 200 
                    }}
                    animate={{ 
                      y: [null, Math.random() * 400 - 200],
                      x: [null, Math.random() * 600 - 300],
                      opacity: [0, 0.4, 0]
                    }}
                    transition={{ 
                      duration: Math.random() * 8 + 4, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 dither-overlay opacity-30"></div>
              
              {/* Scanline Effect */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                {[...Array(60)].map((_, i) => (
                  <div key={i} className="scanline" style={{ top: `${i * 1.6}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text and CTA Buttons */}
        <div className="mt-8 text-center max-w-[700px] mx-auto space-y-8">
          <p className="font-sans text-[14px] leading-relaxed text-[#555]">
            ClaymindAI provides a <span className="font-bold text-black">safe, engaging, and personalized</span> learning environment where children can explore AI as a tool for creativity and discovery.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="brutal-btn min-w-[180px]">
              MEET THE BUDDIES
            </button>
            <button className="bg-white border-2 border-black shadow-brutal p-[12px_24px] font-semibold uppercase font-sans text-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
              START LEARNING
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HumanMachineDivide;