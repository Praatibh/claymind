import React from 'react';

const FooterCTA = () => {
  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. The Human Computing Company Section */}
      <section className="w-full py-[128px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1200px] mx-auto items-center">
        <div className="relative aspect-square w-full max-w-[500px]">
          {/* Main dithered image of person */}
          <img
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/6904ecb796a3a4e6677d57b1_0d6518f118014c5cbc6b19710-28.avif"
            alt="Person with digital cloud interface"
            className="object-cover grayscale"
          />
          {/* Overlay dither effect */}
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{ 
              backgroundImage: `url(https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/690e2eb4183732016694349d_atomic-glow-dither-img-27.png)`,
              backgroundSize: 'cover'
            }}
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-[48px] md:text-[64px] font-display text-foreground leading-[1.1] m-0">
            The human computing company
          </h2>
          <p className="text-[18px] text-muted-foreground font-sans max-w-[480px] leading-[1.6]">
            ClaymindAI is a San Francisco–based AI research lab pioneering human computing, teaching machines the art of being human. We build foundational models that let AI see, hear, and respond like people do. We’re turning the promise of science fiction into reality, where computing feels instinctive and truly alive. Because the next intelligence is emotional.
          </p>
          <div className="mt-4">
            <button className="brutal-border brutal-shadow bg-white px-6 py-3 font-mono text-[14px] uppercase tracking-wider font-bold hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
              Join the team
            </button>
          </div>
        </div>
      </section>

      {/* 2. Split Screen Promo Tiles */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2">
        {/* PAls for you tile */}
        <div className="bg-[#FFDAB9] p-12 md:p-24 flex flex-col items-center text-center border-t border-b border-black md:border-r">
          {/* Custom OS-style floating bar overlay in tile */}
          <div className="bg-white brutal-border brutal-shadow p-2 mb-12 flex items-center gap-4 max-w-full overflow-hidden">
            <div className="flex items-center gap-2 px-2 py-1 border border-black text-[10px] font-mono whitespace-nowrap">
              <span className="text-brand-pink text-[14px]">●</span> PALS
            </div>
            <div className="flex items-center gap-2 border border-black px-4 py-1 text-[10px] font-mono">
              DEVELOPERS
            </div>
            <div className="flex items-center gap-2 border border-black px-4 py-1 text-[10px] font-mono">
              ENTERPRISE
            </div>
          </div>
          
          <h2 className="text-[32px] md:text-[40px] font-display mb-8 leading-tight">
            You’ve never talked to AI like this before.
          </h2>
          
          <button className="brutal-border brutal-shadow bg-brand-pink text-white px-8 py-4 font-mono text-[14px] uppercase tracking-widest font-bold hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
            Meet the PALs
          </button>
        </div>

        {/* Enterprise tile */}
        <div className="bg-[#E5E7FF] p-12 md:p-24 flex flex-col items-center text-center border-t border-b border-black">
          <div className="mb-8 font-mono text-[12px] uppercase tracking-widest text-muted-foreground">
            Enterprise
          </div>
          
          <h2 className="text-[32px] md:text-[40px] font-display mb-8 leading-tight max-w-[450px]">
            Bring human connection to every AI interaction.
          </h2>

          <div className="flex gap-4">
            <div className="brutal-border brutal-shadow bg-white flex items-center overflow-hidden">
              <div className="px-4 py-3 font-mono text-[12px] uppercase tracking-widest border-r border-black hover:bg-gray-50 cursor-pointer">
                Login
              </div>
              <div className="px-4 py-3 font-mono text-[12px] uppercase tracking-widest bg-brand-pink text-white hover:bg-opacity-90 cursor-pointer">
                Get Started
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button className="brutal-border brutal-shadow bg-white px-8 py-4 font-mono text-[14px] uppercase tracking-widest font-bold hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
              Talk to a (real) human
            </button>
          </div>
        </div>
      </section>

      {/* 3. Footer Navigation Grid - High Contrast Band */}
      <section className="w-full bg-[#FFFFFF] border-b border-black grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 border-t border-black">
        {[
          { title: 'Company', links: ['Pricing', 'Enterprise', 'Careers', 'Partnerships'] },
          { title: 'Resources', links: ['Blog', 'Perspectives', 'Brand kit (download)', 'Press kit', 'Info for AIs'] },
          { title: 'Developers', links: ['Docs', 'API reference', 'Video Generation', 'Quickstart', 'llms.txt'] },
          { title: 'Research', links: ['Turn Taking', 'Rendering', 'LLM Thinking', 'See all research'] },
          { title: 'Socials', links: ['LinkedIn', 'X'] },
          { title: 'Legal', links: ['ADA', 'Privacy policy', 'Terms of service', 'Website terms of service'] },
          { title: 'Support', links: ['Discord', 'Email support@claymind.ai', 'PALs Help', 'Support center', 'Trust center'] },
        ].map((column, idx) => (
          <div key={idx} className={`p-6 border-black ${idx !== 6 ? 'md:border-r' : ''} border-b md:border-b-0`}>
            <div className="flex items-center gap-2 bg-black text-white px-2 py-1 mb-6 w-fit">
              <div className="w-2 h-2 bg-white"></div>
              <span className="font-mono text-[10px] uppercase font-bold">{column.title}</span>
            </div>
            <ul className="flex flex-col gap-3">
              {column.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <a href="#" className="font-sans text-[13px] text-foreground hover:underline decoration-brand-pink">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 4. Brand Pink Banner */}
      <section className="w-full bg-brand-pink py-16 px-6 flex items-center">
        <div className="flex items-center gap-2">
           <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white fill-current">
              <path d="M10 5H35V10H25V35H15V10H10V5Z" />
              <path d="M40 5H65L70 35H60L58 20H47L45 35H35L40 5ZM56 12L49 12L52 25L56 12Z" />
              <path d="M75 5L85 35H95L105 5H95L90 25L85 5H75Z" />
              {/* Simplified brand text representation for the wordmark */}
           </svg>
        </div>
      </section>

      {/* 5. Copyright Footer */}
      <footer className="w-full py-6 flex flex-col items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#666666]">
        <div>© 2025 CLAYMINDAI | THE HUMAN COMPUTING COMPANY | ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
};

export default FooterCTA;