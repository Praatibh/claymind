"use client";
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * ComputingConversation Section
 * 
 * Featured content: "Computing that feels like a conversation."
 * Description: Retro-futuristic terminal graphic surrounded by interactive OS windows.
 * Added: Responsive grid and parallax effects on cursor movement.
 */
export default function ComputingConversation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the motion
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transformations for the grid
  const gridRotateX = useTransform(smoothY, [-0.5, 0.5], [65, 55]); // Tilt variation
  const gridRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);   // Side tilt
  const gridTranslateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const gridTranslateY = useTransform(smoothY, [-0.5, 0.5], [180, 220]);

  // Transformations for floating windows (parallax)
  const window1X = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const window1Y = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);
  
  const window2X = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const window2Y = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  
  const window3X = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const window3Y = useTransform(smoothY, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const assets = {
    vintageComputer: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/6902d0dbe2f650b0981e8f9f_computer_no_icon_402x-23.avif",
    computerIcon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/svgs/6902d0daa44b4b8de3c09272_computer_icon_claymind-3.svg",
    eyeIcon: "https://cdn.prod.website-files.com/68c8e57d6e512b9573db146f/68e21a8d9a4f66d4990c0071_multimodal-icon.png",
    lipsIcon: "https://cdn.prod.website-files.com/68c8e57d6e512b9573db146f/68e21a8d9a4f66d4990c0072_perceptive-icon.png",
    codeIcon: "https://cdn.prod.website-files.com/68c8e57d6e512b9573db146f/68e21a8d9a4f66d4990c0073_agentic-icon.png"
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-[120px] bg-[#F1EEE9] border-t border-black"
    >
      {/* Dynamic Background Grid */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          perspective: '1000px',
          rotateX: gridRotateX,
          rotateY: gridRotateY,
          x: gridTranslateX,
          y: gridTranslateY,
          scale: 2,
          maskImage: 'radial-gradient(ellipse at center, black, transparent 70%)'
        }}
      />

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center">
        {/* Header Text */}
        <div className="text-center mb-16 max-w-2xl">
          <h2 className="font-display text-[64px] leading-[1.1] mb-6 text-black">
            Computing that feels <br /> like a conversation.
          </h2>
          <p className="text-sm font-sans text-black max-w-md mx-auto">
            Our startup is redefining the human-machine interface. From PALs to our proprietary APIs, we're adding perception, presence, and emotion to the AI experience.
          </p>
        </div>

        {/* Interactive Visual Area */}
        <div className="relative w-full max-w-[1000px] h-[600px] flex items-center justify-center">
          
          {/* Grainy Yellow/Orange Glow under Computer */}
          <motion.div 
            style={{ x: useTransform(smoothX, [-0.5, 0.5], [-30, 30]), y: useTransform(smoothY, [-0.5, 0.5], [-30, 30]) }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#FFD55F] to-[#FF6B8B] blur-[80px] rounded-full opacity-30 dither-overlay"
          />

          {/* Central Vintage Computer Component */}
          <div className="relative z-20 flex flex-col items-center">
            <motion.div 
              style={{ x: useTransform(smoothX, [-0.5, 0.5], [-10, 10]), y: useTransform(smoothY, [-0.5, 0.5], [-10, 10]) }}
              className="relative w-[400px] h-[400px]"
            >
              <img 
                src={assets.vintageComputer} 
                alt="Vintage Terminal" 
                className="object-contain"
              />
              {/* Animated Screen Icon */}
              <div className="absolute top-[48px] left-[110px] w-[180px] h-[140px] flex flex-col items-start justify-start bg-black overflow-hidden border border-white/10 p-4 font-mono text-[10px] text-green-500 leading-tight">
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src={assets.computerIcon} 
                    alt="Terminal Icon" 
                    width={24} 
                    height={24}
                    className="animate-pulse"
                  />
                  <span className="text-white opacity-50">STARTUP_OS v1.0.4</span>
                </div>
                <div className="space-y-1">
                  <p className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-green-500">> startup.init()</p>
                  <p className="opacity-70">> perception_matrix: OK</p>
                  <p className="opacity-70">> emotional_engine: ACTIVE</p>
                  <p className="opacity-70">> pals_connected: 12.4k</p>
                  <p className="animate-pulse">_</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating OS Windows - Positioned absolutely around the computer */}
          
          {/* Window 1: PALs for you (Top Left) */}
          <motion.div 
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.02, zIndex: 50 }}
            className="absolute top-[5%] left-[2%] w-[330px] os-window z-30 transform -rotate-1 cursor-grab active:cursor-grabbing"
          >
            <div className="os-window-header flex justify-between">
              <div className="flex gap-1.5 items-center w-full">
                <div className="h-[1px] flex-grow bg-black/10"></div>
                <div className="h-[1px] flex-grow bg-black/10"></div>
                <div className="h-[1px] flex-grow bg-black/10"></div>
              </div>
              <div className="flex gap-1 ml-4 items-center">
                <div className="w-[12px] h-[12px] border border-black flex items-center justify-center text-[8px]">_</div>
                <div className="w-[12px] h-[12px] border border-black flex items-center justify-center text-[8px]">□</div>
              </div>
            </div>
            <div className="p-6 bg-[#F7F4EF] pointer-events-none select-none">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FF6B8B]"></div>
                  <h3 className="font-display text-2xl italic">PALS for you</h3>
                </div>
                <div className="w-12 h-12 border border-black/10 grayscale">
                  <img src={assets.eyeIcon} alt="" width={48} height={48} className="object-cover" />
                </div>
              </div>
              <p className="text-sm mb-6 leading-relaxed">
                Your new intern. Or friend. Or both. Perceptive and proactive across text, voice, email, and more.
              </p>
              <div className="inline-block text-[11px] font-ui-mono border border-black px-4 py-2 bg-white shadow-brutal-sm pointer-events-auto cursor-pointer hover:bg-black hover:text-white transition-colors">
                JOIN THE QUEUE
              </div>
            </div>
          </motion.div>

          {/* Window 2: APIs for developers (Bottom Left) */}
          <motion.div 
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.02, zIndex: 50 }}
            className="absolute bottom-[5%] left-[5%] w-[330px] os-window z-30 transform rotate-1 cursor-grab active:cursor-grabbing"
          >
            <div className="os-window-header flex justify-between">
              <div className="flex gap-1.5 items-center w-full">
                <div className="h-[1px] flex-grow bg-black/10"></div>
                <div className="h-[1px] flex-grow bg-black/10"></div>
              </div>
              <div className="flex gap-1 ml-4 items-center">
                <div className="w-[12px] h-[12px] border border-black flex items-center justify-center text-[8px]">_</div>
                <div className="w-[12px] h-[12px] border border-black flex items-center justify-center text-[8px]">□</div>
              </div>
            </div>
            <div className="p-6 bg-[#F7F4EF] pointer-events-none select-none">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#39E17F]"></div>
                  <h3 className="font-display text-2xl italic leading-tight">APIs for developers <br /> & businesses</h3>
                </div>
                <div className="w-12 h-12 border border-black/10 grayscale">
                   <img src={assets.codeIcon} alt="" width={48} height={48} className="object-cover" />
                </div>
              </div>
              <p className="text-sm mb-6 leading-relaxed">
                Embed white-labeled, real-time, face-to-face AI into your app with one seamless API.
              </p>
              <div className="inline-block text-[11px] font-ui-mono border border-black px-4 py-2 bg-white shadow-brutal-sm pointer-events-auto cursor-pointer hover:bg-black hover:text-white transition-colors">
                SEE DOCS
              </div>
            </div>
          </motion.div>

          {/* Window 3: PALS for enterprise (Center Right) */}
          <motion.div 
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.02, zIndex: 50 }}
            className="absolute top-[35%] right-[2%] w-[330px] os-window z-30 transform -rotate-2 cursor-grab active:cursor-grabbing"
          >
            <div className="os-window-header flex justify-between">
              <div className="flex gap-1.5 items-center w-full">
                <div className="h-[1px] flex-grow bg-black/10"></div>
                <div className="h-[1px] flex-grow bg-black/10"></div>
              </div>
              <div className="flex gap-1 ml-4 items-center">
                <div className="w-[12px] h-[12px] border border-black flex items-center justify-center text-[8px]">_</div>
                <div className="w-[12px] h-[12px] border border-black flex items-center justify-center text-[8px]">□</div>
              </div>
            </div>
            <div className="p-6 bg-[#F7F4EF] pointer-events-none select-none">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FF6B8B]"></div>
                  <h3 className="font-display text-2xl italic leading-tight">PALS for <br />enterprises</h3>
                </div>
                <div className="w-12 h-12 border border-black/10 grayscale">
                  <img src={assets.lipsIcon} alt="" width={48} height={48} className="object-cover" />
                </div>
              </div>
              <p className="text-sm mb-6 leading-relaxed">
                Deploy AI Humans across your organization. Scalable, secure, and available in 30+ languages.
              </p>
              <div className="inline-block text-[11px] font-ui-mono border border-black px-4 py-2 bg-white shadow-brutal-sm pointer-events-auto cursor-pointer hover:bg-black hover:text-white transition-colors">
                GET IN TOUCH
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Dither pattern overlay for texture */}
      <div className="absolute inset-0 z-[5] pointer-events-none dither-overlay opacity-[0.03]"></div>
    </section>
  );
}
