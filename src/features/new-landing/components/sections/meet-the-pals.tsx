
const MeetThePALs = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7F4EF] py-32 md:py-48">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Text */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <h2 className="text-[48px] md:text-[64px] font-display text-[#1A1A1A] leading-tight mb-6">
            Meet the PALs.
          </h2>
          <p className="text-[18px] text-[#666666] font-sans leading-relaxed">
            Your personal AI that remembers, evolves, and never logs off.<br />
            Call them. Text them. Or talk face-to-face.
          </p>
        </div>

        {/* Interactive Windows Area */}
        <div className="relative h-[600px] md:h-[700px] w-full max-w-5xl mx-auto">
          
          {/* Background blurred windows (Visual Metaphor) */}
          <div className="absolute top-10 -left-12 opacity-30 blur-[2px] transition-all hover:opacity-100 hover:blur-0 z-0 hidden md:block">
            <WindowSkeleton title="CHAT" dotColor="#40FF80" width="280px">
              <div className="p-4 space-y-3">
                <div className="bg-[#E5E1DA] h-12 w-full" />
                <div className="bg-white border border-black p-2 text-[12px] font-sans">
                  PAL: Maybe let&apos;s jump on a call?
                </div>
              </div>
            </WindowSkeleton>
          </div>

          <div className="absolute top-0 right-[-10%] opacity-30 blur-[2px] transition-all hover:opacity-100 hover:blur-0 z-0 hidden lg:block">
            <WindowSkeleton title="CHAT" dotColor="#FF6080" width="320px">
              <div className="p-4 space-y-3">
                <div className="bg-white border border-black p-3 text-[13px] font-sans italic">
                  I&apos;m kinda freaking out. What should I I know about them for the first interview?
                </div>
                <div className="bg-[#F7F4EF] border border-black p-3 text-[13px] font-sans">
                  <strong>PAL:</strong> I got you, looking up their details right now!
                </div>
              </div>
            </WindowSkeleton>
          </div>

          {/* Main Focused Window: FACE-TO-FACE VIDEO */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-[560px]">
            <div className="bg-white border-[1px] border-black shadow-brutal-lg flex flex-col">
              <div className="window-title-bar flex items-center justify-between border-b-[1px] border-black h-[32px] px-3 bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-[10px] h-[10px] bg-[#FF6080]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Face-to-Face Video</span>
                </div>
                <div className="flex gap-1 h-full items-center">
                  <div className="w-[40px] h-full flex flex-col justify-center gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-[1px] w-full bg-black/20" />
                    ))}
                  </div>
                  <div className="w-[16px] h-[16px] border border-black/20 flex items-center justify-center">
                    <div className="w-[6px] h-[6px] border border-black/40" />
                  </div>
                </div>
              </div>
              <div className="relative aspect-video bg-[#222]">
                 <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68f0e3bb7519143839804c61_v2-9.avif"
                  alt="Face-to-Face Video Interface"
                  fill
                  className="object-cover"
                />
                {/* Interface Controls Overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                   <ControlIcon icon="chat" />
                   <ControlIcon icon="video" />
                   <ControlIcon icon="phone" color="#FF6080" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Focused Window: VOICE */}
          <div className="absolute bottom-[10%] right-[0%] md:right-[5%] z-40 w-[300px] hidden sm:block">
            <div className="bg-white border-[1px] border-black shadow-brutal flex flex-col">
              <div className="window-title-bar flex items-center justify-between border-b-[1px] border-black h-[28px] px-3 bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-[8px] h-[8px] bg-[#FF9C37]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Voice</span>
                </div>
                <div className="w-[30px] h-full flex flex-col justify-center gap-[2px]">
                   {[...Array(4)].map((_, i) => <div key={i} className="h-[1px] w-full bg-black/10" />)}
                </div>
              </div>
              <div className="p-4 bg-white flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 bg-[#F0F0F0] h-[34px] border border-black/10 relative overflow-hidden flex items-center px-2">
                    <div className="h-[4px] w-[60%] bg-black/60" />
                  </div>
                  <button className="bg-[#40FF80] border border-black px-3 h-[34px] flex items-center gap-2 hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
                    <div className="w-3 h-3 overflow-hidden">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-tight">Listen</span>
                  </button>
                </div>
                <div className="flex items-center justify-center py-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-black relative">
                     <Image 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/690c959a23ddc18ac3385d88_voice-15.avif"
                      alt="Voice interaction avatar"
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-end gap-[2px] h-10 px-2">
                   {[...Array(24)].map((_, i) => (
                     <div 
                      key={i} 
                      className="w-[3px] bg-black/10" 
                      style={{ height: `${Math.random() * 100}%`, backgroundColor: i % 3 === 0 ? '#111' : '#ccc'}}
                    />
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tertiary Window: CHAT */}
          <div className="absolute bottom-[5%] left-[0%] md:left-[2%] z-45 w-full max-w-[340px]">
            <div className="bg-white border-[1px] border-black shadow-brutal flex flex-col">
              <div className="window-title-bar flex items-center gap-2 border-b-[1px] border-black h-[28px] px-3 bg-white">
                <div className="w-[8px] h-[8px] bg-[#40FF80]" />
                <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Chat</span>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="bg-[#F7F4EF] border border-black p-4 text-[14px] font-sans leading-snug">
                  I&apos;m thinking of going on a bike trip in patagonia, could you price it out?
                </div>
                <div className="text-[14px] font-sans leading-snug">
                  <span className="font-bold">PAL:</span> No prob. I did a bunch of research and priced out everything out in <span className="text-[#FF6080] underline decoration-1 underline-offset-2 cursor-pointer">this sheet</span>.
                </div>
                <div className="border-t border-black/10 pt-4 flex items-center justify-between">
                   <span className="font-mono text-[10px] text-[#666] tracking-widest uppercase">Write a response...</span>
                   <div className="w-4 h-4 text-black/20">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Call to Action for this Section */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center w-full z-10">
            <h3 className="text-2xl font-display italic mb-6">Your new intern, friend, or both.</h3>
            <div className="inline-block p-[2px] bg-black">
              <button className="bg-[#FF6080] border-2 border-black px-10 py-4 text-white font-mono text-sm font-bold uppercase tracking-widest active:translate-x-[2px] active:translate-y-[2px] transition-transform">
                Join the queue
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative dither background element */}
      <div className="absolute top-0 right-0 w-[50%] h-[100%] pointer-events-none opacity-5 dither-bg z-0" />
    </section>
  );
};

// Internal Helper Components
const WindowSkeleton = ({ title, dotColor, width, children }: { title: string, dotColor: string, width: string, children: React.ReactNode }) => (
  <div 
    className="bg-white border-[1px] border-black shadow-sm flex flex-col transition-all cursor-default"
    style={{ width }}
  >
    <div className="window-title-bar flex items-center gap-2 border-b-[1px] border-black h-[24px] px-2">
      <div className="w-[6px] h-[6px]" style={{ backgroundColor: dotColor }} />
      <span className="font-mono text-[8px] uppercase tracking-wider">{title}</span>
    </div>
    <div className="win-body">
      {children}
    </div>
  </div>
);

const ControlIcon = ({ icon, color = "white" }: { icon: string, color?: string }) => {
  const isAlt = color !== "white";
  return (
    <div className={`w-10 h-10 border border-black flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95`} style={{ backgroundColor: color }}>
      {icon === 'chat' && (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      )}
      {icon === 'video' && (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
      )}
      {icon === 'phone' && (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={isAlt ? "white" : "black"} strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      )}
    </div>
  );
};

export default MeetThePALs;