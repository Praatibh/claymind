import React from 'react';

const ConversationalComputing = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F4EF] py-24 md:py-32">
      <div className="container relative mx-auto px-6 max-w-[1200px]">
        {/* Header Content */}
        <div className="mb-20 text-center">
          <h2 className="mb-6 font-display text-4xl leading-tight tracking-tight text-[#1A1A1A] md:text-6xl">
            Computing that feels<br />like a conversation.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#666666]">
            From PALs to our APIs, we add perception, presence, and emotion
            to all the ways people interact with AI.
          </p>
        </div>

        {/* Interactive Layout Grid */}
        <div className="relative flex flex-col items-center justify-center lg:h-[700px]">
          {/* Background Grid Pattern Overlay (Visual only) */}
          <div className="absolute inset-0 z-0 opacity-[0.05]" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          
          {/* Central Vintage Computer Asset */}
          <div className="relative z-10 my-12 lg:my-0 lg:scale-110">
            <div className="relative">
              {/* Glow Highlight Effect */}
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF9C37] opacity-40 blur-[80px]" />
              
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/6902d0dbe2f650b0981e8f9f_computer_no_icon_402x-23.avif"
                alt="Vintage Computer"
                width={402}
                height={400}
                className="relative z-10 drop-shadow-2xl"
              />
              {/* Logo Overlay on Screen */}
              <div className="absolute left-[36%] top-[18%] z-20 w-[24%] translate-x-1/2 opacity-90 grayscale brightness-125">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/svgs/6902d0daa44b4b8de3c09272_computer_icon_tavus-3.svg"
                  alt="ClaymindAI Logo"
                  width={60}
                  height={60}
                />
              </div>
            </div>
          </div>

          {/* Individual Informative Cards - Positioned absolutely on LG, stacked on mobile */}
          
          {/* Top Left: PALs for You */}
          <div className="z-20 w-full max-w-xs border border-black bg-white p-5 shadow-brutal transition-transform hover:-translate-y-1 lg:absolute lg:left-0 lg:top-10">
            <div className="mb-3 flex items-center justify-between border-b border-black pb-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-[#FF6080]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">■ PALs for you</span>
              </div>
              <div className="h-6 w-6 opacity-30">
                 {/* Dithered icon placeholder */}
                 <div className="h-full w-full bg-[radial-gradient(#000_0.5px,transparent_0.5px)] bg-[length:3px_3px]" />
              </div>
            </div>
            <p className="mb-6 h-20 text-[15px] leading-snug text-[#1A1A1A]">
              Your new intern. Or friend. Or both. Perceptive and proactive across text, voice, email, and more.
            </p>
            <a 
              href="https://platform.claymind.ai/auth/sign-up" 
              className="inline-block border border-black bg-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] shadow-[2px_2px_0px_#000] hover:bg-[#F7F4EF] active:shadow-none transition-all"
            >
              JOIN THE QUEUE
            </a>
          </div>

          {/* Bottom Right: PALs for Enterprises */}
          <div className="z-20 mt-8 w-full max-w-xs border border-black bg-white p-5 shadow-brutal transition-transform hover:-translate-y-1 lg:absolute lg:bottom-1/4 lg:right-0 lg:mt-0">
            <div className="mb-3 flex items-center justify-between border-b border-black pb-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-[#FF9C37]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">■ PALs for enterprises</span>
              </div>
              <div className="h-6 w-6 opacity-30">
                 <div className="h-full w-full bg-[radial-gradient(#000_0.5px,transparent_0.5px)] bg-[length:3px_3px]" />
              </div>
            </div>
            <p className="mb-6 h-20 text-[15px] leading-snug text-[#1A1A1A]">
              Deploy AI Humans across your organization. Scalable, secure, and available in 30+ languages.
            </p>
            <a 
              href="/demo" 
              className="inline-block border border-black bg-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] shadow-[2px_2px_0px_#000] hover:bg-[#F7F4EF] active:shadow-none transition-all"
            >
              GET IN TOUCH
            </a>
          </div>

          {/* Bottom Left: APIs for developers */}
          <div className="z-20 mt-8 w-full max-w-xs border border-black bg-white p-5 shadow-brutal transition-transform hover:-translate-y-1 lg:absolute lg:bottom-0 lg:left-10 lg:mt-0">
            <div className="mb-3 flex items-center justify-between border-b border-black pb-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-[#40FF80]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">■ APIs for developers</span>
              </div>
              <div className="h-6 w-6 opacity-30">
                 <div className="h-full w-full bg-[radial-gradient(#000_0.5px,transparent_0.5px)] bg-[length:3px_3px]" />
              </div>
            </div>
            <p className="mb-6 h-20 text-[15px] leading-snug text-[#1A1A1A]">
              Embed white-labeled, real-time, face-to-face AI into your app with one seamless API.
            </p>
            <a 
              href="https://docs.claymind.ai" 
              className="inline-block border border-black bg-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A] shadow-[2px_2px_0px_#000] hover:bg-[#F7F4EF] active:shadow-none transition-all"
            >
              SEE DOCS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversationalComputing;