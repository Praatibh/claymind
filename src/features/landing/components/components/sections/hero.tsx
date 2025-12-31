"use client";
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Hero Section Component
 * 
 * Clones the hero section with:
 * - Headline: "You’ve never met AI like this"
 * - Background ripple video effect
 * - Draggable OS-style windows showcasing video and media
 */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for draggable windows
    const [windows, setWindows] = useState([
      {
        id: "video",
        title: "AI LEARNING BUDDY",
        isActive: true,
        x: 750,
        y: 120,
        width: 420,
        type: "face",
        dotColor: "bg-[#000000]",
        videoUrl: "https://app.vidzflow.com/v/QqSyUJLhvE?dq=576&ap=true&muted=true&loop=true&ctp=true&bc=%234E5FFD&controls=",
      },
      {
        id: "media",
        title: "KIDS-SAFE EXPLORER",
        isActive: false,
        x: 680,
        y: 380,
        width: 320,
        type: "media",
        dotColor: "bg-[#39E17F]",
          videoUrl: "https://www.youtube.com/embed/ZSt9tm3RoUU?autoplay=0&mute=0",
        },
    ]);

  // Handle window dragging (simplified for React)
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number } | null>(null);

  const startDrag = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragging({ id, startX: clientX, startY: clientY });
    
    // Bring to front
    setWindows(prev => prev.map(w => ({
      ...w,
      isActive: w.id === id
    })));
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      const dx = clientX - dragging.startX;
      const dy = clientY - dragging.startY;
      
      setWindows(prev => prev.map(w => {
        if (w.id === dragging.id) {
          return { ...w, x: w.x + dx, y: w.y + dy };
        }
        return w;
      }));
      
      setDragging({ ...dragging, startX: clientX, startY: clientY });
    };

    const handleUp = () => setDragging(null);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [dragging]);

  return (
    <section className="relative min-height-[100vh] w-full overflow-hidden bg-[#F1EEE9] pt-[120px] pb-[120px]">
      {/* Background Ripple Effect */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68ee0de82eeac37be67f824a_Hero-v2-1.avif"
          alt="Ripple Background"
          fill
          className="object-cover opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay dither-overlay"></div>
        
        {/* Ripple Video Overlay (Simplified implementation) */}
        <iframe 
          src="https://app.vidzflow.com/v/qPWiotOQpN?dq=576&ap=true&muted=true&loop=true&ctp=false&bc=%234E5FFD&controls=" 
          className="absolute inset-0 w-full h-full border-none opacity-40 pointer-events-none scale-110"
        />
      </div>

      <div className="container relative z-10 flex flex-col items-start px-6 md:px-12 pointer-events-none">
        <div className="max-w-[800px] mt-[60px] pointer-events-auto">
          <h1 className="text-[3rem] md:text-[5.25rem] font-display italic leading-[1.1] text-foreground mb-6">
            Empowering young minds with AI
          </h1>
          <p className="text-[1.25rem] font-sans text-foreground/80 mb-10 max-w-[500px]">
            ClaymindAI makes artificial intelligence fun, safe, and accessible for the next generation of creators.
          </p>
          
          <div className="flex gap-4">
            <a 
              href="https://platform.claymind.ai/auth/sign-up" 
              className="brutal-btn flex items-center justify-center min-w-[200px]"
            >
              Start learning
            </a>
          </div>
        </div>
      </div>

      {/* Draggable Windows Container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 pointer-events-none md:block hidden"
      >
        {windows.map((win) => (
          <div
            key={win.id}
            className={`os-window absolute pointer-events-auto transition-shadow duration-75 ${win.isActive ? 'z-50' : 'z-20'}`}
            style={{ 
              transform: `translate(${win.x}px, ${win.y}px)`,
              width: `${win.width}px`
            }}
          >
            {/* Window Header */}
            <div 
              className="os-window-header cursor-grab active:cursor-grabbing select-none"
              onMouseDown={(e) => startDrag(win.id, e)}
              onTouchStart={(e) => startDrag(win.id, e)}
            >
              <div className="flex items-center gap-2 flex-1">
                <div className={`w-3 h-3 border border-black ${win.dotColor}`}></div>
                <span className="font-ui-mono tracking-wider">{win.title}</span>
              </div>
              <div className="flex-1 px-4">
                <div className="flex flex-col gap-[2px]">
                  <div className="h-[1px] bg-black/30 w-full"></div>
                  <div className="h-[1px] bg-black/30 w-full"></div>
                  <div className="h-[1px] bg-black/30 w-full"></div>
                </div>
              </div>
              <div className="w-5 h-5 border border-black flex items-center justify-center bg-white ml-2 overflow-hidden">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="scale-75">
                  <path d="M1 1H4.5V4.5H1V1Z" stroke="black" strokeWidth="0.5" />
                  <path d="M5.5 5.5H9V9H5.5V5.5Z" stroke="black" strokeWidth="0.5" />
                </svg>
              </div>
            </div>

            {/* Window Body */}
            <div className={`relative overflow-hidden ${win.id === 'media' ? 'aspect-video' : 'aspect-[4/3]'} bg-black`}>
              <iframe
                src={win.videoUrl}
                className="w-full h-full border-none"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              />
              {/* Scanline overlay only for hifi retro feel */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]"></div>
              
              {/* Special CTA button for the first window */}
              {win.id === "video" && (
                <a 
                  href="#" 
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 group scale-90"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="relative z-10 bg-[#39E17F] border-2 border-black flex items-center px-4 py-2 gap-3 shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all">
                      <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
                      <span className="font-ui-mono font-bold text-black uppercase tracking-tighter">Start Lesson</span>
                      <div className="w-8 h-8 flex items-center justify-center border-l-2 border-black -mr-4 ml-2 bg-white">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 3l14 9-14 9V3z" />
                        </svg>
                      </div>
                  </div>
                  <Image 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68c8e57e6e512b9573db1a50_hero-cta-bg-2.webp"
                    alt="CTA effect"
                    width={300}
                    height={100}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none scale-150"
                  />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-only static preview of windows */}
      <div className="container relative z-10 mt-12 md:hidden flex flex-col gap-6 px-6">
        {windows.slice(0, 1).map((win) => (
          <div key={win.id} className="os-window w-full">
            <div className="os-window-header">
              <div className="flex items-center gap-2 flex-1">
                <div className={`w-3 h-3 border border-black ${win.dotColor}`}></div>
                <span className="font-ui-mono tracking-wider">{win.title}</span>
              </div>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={win.videoUrl}
                className="w-full h-full border-none"
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .dither-overlay {
          background-image: radial-gradient(#000000 0.5px, transparent 0.5px);
          background-size: 3px 3px;
        }
      `}</style>
    </section>
  );
}