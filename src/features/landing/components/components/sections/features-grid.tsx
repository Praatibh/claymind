"use client";
import React from 'react';
import Image from 'next/image';

const features = [
  {
    title: 'Interactive',
    subtitle: 'Learn by doing',
    description: 'Engage in hands-on projects and interactive lessons that make complex concepts simple.',
    icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68f263dbc8c3d7bd27813ce1_Multimodal-17.avif',
  },
  {
    title: 'Safe',
    subtitle: 'Kids-safe environment',
    description: 'Built with privacy and safety first. A curated space where kids can explore AI without risks.',
    icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68f263db00a81dd548874466_Proactive-18.avif',
  },
  {
    title: 'Adaptive',
    subtitle: 'Grows with you',
    description: 'Our AI buddies adapt to each child\'s learning pace, providing personalized challenges and support.',
    icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68f263db7e09746fcd74e23d_Adaptive-19.avif',
  },
  {
    title: 'Creative',
    subtitle: 'Build your own worlds',
    description: 'Empower kids to create games, art, and stories using AI as their ultimate creative partner.',
    icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68f263dbc32b375a880ead31_Agentic-20.png',
  },
  {
    title: 'Curious',
    subtitle: 'Ask anything',
    description: 'Foster curiosity with a tutor that never gets tired of "Why?". Explore science, history, and more.',
    icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68f263dbc32b375a880ead31_Agentic-20.png', 
  },
];

const FeaturesGrid = () => {
  return (
    <section className="bg-background py-[120px] px-6">
      <div className="container max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col space-y-6">
              {/* Icon Container with Dithered Effect */}
              <div className="relative w-[80px] h-[80px] grayscale overflow-hidden">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={80}
                  height={80}
                  className="object-cover pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
                {/* Dither pattern overlay */}
                <div className="absolute inset-0 dither-overlay opacity-30 pointer-events-none"></div>
                {/* Artistic border/shadow effect consistent with high-level design */}
                <div className="absolute inset-0 border border-black/10"></div>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-sans font-semibold text-[32px] leading-[1.1] text-foreground tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="font-sans font-semibold text-[14px] leading-tight text-foreground uppercase tracking-wider">
                    {feature.subtitle}
                  </p>
                </div>
                
                <p className="font-sans text-[14px] leading-[1.6] text-muted-foreground max-w-[200px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retro Horizontal Divider System as seen in screenshots */}
      <div className="mt-32 w-full border-y border-black/5 py-4 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center mx-4 gap-4 opacity-20 filter grayscale">
              <span className="font-sans text-[12px] uppercase tracking-widest">Interactive Lessons</span>
              <span className="w-1 h-1 bg-black rounded-full"></span>
              <span className="font-sans text-[12px] uppercase tracking-widest">Fun Games</span>
              <span className="w-1 h-1 bg-black rounded-full"></span>
              <span className="font-sans text-[12px] uppercase tracking-widest">AI Buddies</span>
              <span className="w-1 h-1 bg-black rounded-full"></span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .pixelated {
          image-rendering: -moz-crisp-edges;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: pixelated;
          image-rendering: optimize-speed;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesGrid;