"use client";
import React from 'react';

const CtaFooterTease = () => {
  return (
    <section className="flex flex-col md:flex-row w-full min-h-[460px] border-t border-black">
      {/* Left Section - Peach */}
      <div className="flex-1 bg-[#FDD5C0] flex flex-col items-center justify-between py-16 px-6 relative border-b md:border-b-0 md:border-r border-black">
        <div className="w-full max-w-[480px] flex flex-col items-center">
          {/* Header Tab Style Window */}
          <div className="w-full mb-12 flex justify-center">
            <div className="flex border border-black bg-[#F7F4EF] shadow-[6px-6px-0px_#000000] overflow-hidden">
              <div className="px-4 py-2 border-r border-black flex items-center gap-3">
                <img 
                  src="https://cdn.prod.website-files.com/68c8e57d6e512b9573db146f/68c8e57e6e512b9573db1aa0_logo.svg" 
                  alt="ClaymindAI Logo" 
                  className="h-4"
                />
              </div>
                <div className="px-4 py-2 border-r border-black flex items-center gap-2">
                  <span className="bg-[#FF6B8B] text-[10px] text-white px-1 leading-none font-bold">BETA</span>
                  <span className="text-[11px] uppercase font-bold tracking-wider">BUDDIES</span>
                </div>
                <div className="px-4 py-2 border-r border-black flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-black"></div>
                  <span className="text-[11px] uppercase font-bold tracking-wider">LEARNING</span>
                </div>
                <div className="px-4 py-2 border-r border-black flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-black"></div>
                  <span className="text-[11px] uppercase font-bold tracking-wider">SAFETY</span>
                </div>
                <div className="px-4 py-2 border-r border-black flex items-center">
                  <span className="text-[11px] uppercase font-bold tracking-wider">RESEARCH</span>
                </div>
                <div className="px-4 py-2 flex items-center font-bold">
                  <span className="text-[11px] uppercase tracking-wider">CURRICULUM</span>
                </div>
            </div>
          </div>

          <h2 className="text-[42px] leading-[1.1] text-center font-display italic mb-10 max-w-[400px]">
            Unlock the magic of learning with AI.
          </h2>

          <a 
            href="https://platform.claymind.ai/auth/sign-up"
            className="bg-[#FF6B8B] border-2 border-black text-[14px] font-bold uppercase tracking-widest px-8 py-3 shadow-[6px_6px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
          >
            MEET YOUR BUDDIES
          </a>
        </div>
      </div>

      {/* Right Section - Lavender */}
      <div className="flex-1 bg-[#E4E2F4] flex flex-col items-center justify-between py-16 px-6 relative">
        <div className="w-full max-w-[480px] flex flex-col items-center">
          {/* Right Header Tab */}
          <div className="w-full mb-12 flex justify-center">
               <div className="flex border border-black bg-[#F7F4EF] shadow-[6px-6px-0px_#000000] overflow-hidden">
                  <div className="px-8 py-2 flex items-center justify-center font-bold border-r border-black">
                     <span className="text-[11px] uppercase font-bold tracking-widest text-[#808080]">EDUCATION</span>
                  </div>
                  <div className="px-6 py-2 border-r border-black flex items-center gap-2">
                     <div className="w-2.5 h-2.5 bg-black"></div>
                     <span className="text-[11px] uppercase font-bold tracking-widest">LOGIN</span>
                  </div>
                  <div className="px-6 py-2 bg-[#FF6B8B] flex items-center gap-2">
                     <div className="w-2.5 h-2.5 bg-black"></div>
                     <span className="text-[11px] uppercase font-bold tracking-widest">START</span>
                  </div>
               </div>
          </div>

          <h2 className="text-[42px] leading-[1.1] text-center font-display mb-10 max-w-[440px]">
            Personalized AI tutoring for every child.
          </h2>

          <a 
            href="/demo"
            className="bg-white border-2 border-black text-[14px] font-bold uppercase tracking-widest px-8 py-3 shadow-[6px_6px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
          >
            GET STARTED NOW
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaFooterTease;