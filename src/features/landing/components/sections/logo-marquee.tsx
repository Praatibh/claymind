"use client";
import React from 'react';
import Image from 'next/image';

/**
 * LogoMarquee Component
 * 
 * A pixel-perfect clone of the scrolling brand marquee section.
 * Features grayscale logos of partner companies on a neutral background (#F1EEE9).
 * 
 * Design Details:
 * - Background: #F1EEE9 (color-background)
 * - Typography: Inter (Sans), 14px size for the title
 * - Animation: Smooth horizontal translation
 */

const LOGO_ASSETS = [
  {
    url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/6913cbc2bedec7104679a887_Logo_of_Deloitte-3.png",
    alt: "Deloitte Logo",
    width: 140,
    height: 32
  },
  {
    url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/6913af263342f85385be96c4_Frame_202147229100-4.png",
    alt: "Partner Logo",
    width: 100,
    height: 32
  },
  {
    url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/6913d9a161c6ca8ac828bb20_ChatGPT_20Image_20Nov_201-5.png",
    alt: "ChatGPT Logo",
    width: 120,
    height: 32
  },
  {
    url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/6913d9caf5d4b8841ecc78ed_Amazon_logo-6.png",
    alt: "Amazon Logo",
    width: 100,
    height: 32
  },
];

const LogoMarquee: React.FC = () => {
  // Triple the items to ensure seamless infinite scroll
  const marqueeItems = [...LOGO_ASSETS, ...LOGO_ASSETS, ...LOGO_ASSETS];

  return (
    <section className="w-full bg-[#F1EEE9] border-t border-b border-black overflow-hidden select-none">
      <div className="container mx-auto px-6 py-6 lg:py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        
        {/* Title Text */}
        <div className="whitespace-nowrap z-10 bg-[#F1EEE9] pr-4">
          <h2 className="text-[14px] font-sans font-normal uppercase tracking-tight text-black leading-none opacity-80">
            Top companies are building & employing AI humans
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="relative flex-1 overflow-hidden pointer-events-none">
          {/* Gradient Fades for Smooth Appearance */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#F1EEE9] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#F1EEE9] to-transparent z-10" />

          {/* Scrolling Row */}
          <div className="flex animate-marquee whitespace-nowrap items-center gap-12 lg:gap-20">
            {marqueeItems.map((logo, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 flex items-center justify-center grayscale opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={logo.url}
                  alt={logo.alt}
                  style={{ height: '24px', width: 'auto' }}
                  className="max-w-none object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @media (max-width: 768px) {
           .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
};

export default LogoMarquee;