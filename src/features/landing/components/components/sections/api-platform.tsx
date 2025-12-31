"use client";
import React from 'react';
import Image from 'next/image';

const ApiPlatform = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F1EEE9] py-[120px] font-sans">
      <div className="container mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Content Column */}
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-4">
              <span className="font-ui-mono text-[12px] uppercase tracking-wider text-[#808080]">
                FOR DEVELOPERS & ENTERPRISES
              </span>
              <h2 className="font-display text-[64px] leading-[1.1] text-[#000000]">
                ClaymindAI API platform
              </h2>
            </div>
            
            <p className="max-w-[540px] text-[16px] leading-[1.6] text-[#000000]">
              Build conversational AI video experiences in minutes. Our APIs give developers out-of-the-box building blocks for embeddable real-time video, voice, and vision—secure, white-labeled, and built for scale. With only ~500ms latency and a data layer that enriches each interaction, you can create AI recruiters, tutors, agents, companions and more that feel human.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <a 
                href="#" 
                className="brutal-btn flex items-center justify-center border-2 border-black bg-[#F7F4EF] px-8 py-3 font-semibold uppercase text-black shadow-brutal transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#000000]"
              >
                Learn More
              </a>
              <a 
                href="#" 
                className="brutal-btn flex items-center justify-center border-2 border-black bg-[#FF6B8B] px-8 py-3 font-semibold uppercase text-black shadow-brutal transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#000000]"
              >
                Get Started For Free
              </a>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="relative flex h-[600px] w-full items-center justify-center">
            {/* Dithered/Noise Background Area */}
            <div 
              className="absolute inset-0 z-0 opacity-100" 
              style={{
                backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68ef6d459a69320363032ca0_api_20image-29.avif')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#E4E2F4'
              }}
            />
            
            {/* Floating Windows Stack */}
            <div className="relative z-10 w-full max-w-[500px]">
              
              {/* Window 1: Curl Request - Top Left */}
              <div className="os-window absolute -top-12 -left-8 w-[320px] bg-white">
                <div className="os-window-header flex items-center justify-between border-b border-black px-3 py-1 bg-white">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 border border-black bg-white" />
                    <div className="h-2.5 w-2.5 border border-black bg-white" />
                  </div>
                </div>
                <div className="p-4 font-mono text-[11px] leading-relaxed text-[#000000]">
                  <div className="text-blue-600">curl <span className="text-black">--request POST \</span></div>
                  <div className="pl-4">--url https://claymindapi.com/v2/conversations \</div>
                  <div className="pl-4">--header <span className="text-green-600">'Content-Type: application/json'</span> \</div>
                  <div className="pl-4">--header <span className="text-green-600">'x-api-key: &lt;api-key&gt;'</span> \</div>
                  <div className="pl-4">--data '{'{'}</div>
                  <div className="pl-8 text-orange-600">"replica_id": "rfe12d8b9597",</div>
                  <div className="pl-8 text-orange-600">"persona_id": "pdoa222244b"</div>
                  <div className="pl-4 text-black">{'}'}'</div>
                </div>
              </div>

              {/* Window 2: Main Empty Preview - Center Large */}
              <div className="os-window h-[280px] w-[400px] bg-white translate-x-12 translate-y-4">
                <div className="os-window-header flex items-center justify-between border-b border-black px-3 py-2 bg-white">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 border border-black bg-[#39E17F]" />
                    <span className="font-ui-mono text-[10px]">LIVE_PREVIEW</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-3 w-3 border border-black" />
                    <div className="h-3 w-3 border border-black bg-black" />
                  </div>
                </div>
                <div className="relative h-full w-full bg-[#f8f8f8]">
                  <div className="dither-overlay absolute inset-0 opacity-10" />
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/5" />
                </div>
              </div>

              {/* Window 3: Feature Logic - Bottom Left Overlay */}
              <div className="os-window absolute -bottom-16 -left-4 w-[280px] bg-[#3B3A5A] text-white">
                <div className="os-window-header flex items-center justify-between border-b border-white px-3 py-1 bg-[#2D2C4A]">
                   <div className="h-2.5 w-2.5 border border-white bg-[#FF6B8B]" />
                   <div className="flex items-center gap-1">
                      <div className="h-[2px] w-6 bg-white/30" />
                   </div>
                </div>
                <div className="p-5 font-mono text-[11px] leading-6">
                  <div className="text-[#39E17F]">claymind_features {'{'}</div>
                  <div className="pl-4">Languages: 30+</div>
                  <div className="pl-4">RAG: On,</div>
                  <div className="pl-4">Memory: On,</div>
                  <div className="pl-4">Guardrails: On,</div>
                  <div className="pl-4">Perception: On,</div>
                  <div className="pl-4">Tool_Calling: On,</div>
                  <div className="pl-4">Multimodal: On,</div>
                  <div className="pl-4 text-[#FF6B8B]">Response_Time: 200ms,</div>
                  <div className="pl-4">Turn_Taking: Adaptive</div>
                  <div className="pl-4">Emotions: Detected</div>
                  <div className="text-[#39E17F]">{'}'}</div>
                </div>
                
                {/* Small inner box icon */}
                <div className="absolute top-4 right-4 h-10 w-10 border border-white/20 bg-white/5 p-1">
                  <div className="h-full w-full flex items-center justify-center opacity-40">
                    <div className="relative h-4 w-4">
                      <div className="absolute inset-0 border border-white" />
                      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Scanline/Noise (Global style compatible) */}
      <div className="scanline top-1/4 opacity-10" />
      <div className="scanline top-1/2 opacity-10" />
      <div className="scanline top-3/4 opacity-10" />
    </section>
  );
};

export default ApiPlatform;