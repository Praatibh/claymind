"use client";
import React, { useState } from 'react';
import DitheredShape from '@/features/landing/components/ui/dithered-shape';

const PALS_DATA = [
    {
      id: 'noah',
      name: 'Noah',
      subtitle: 'The Math Whiz',
      avatar: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=400&h=400&auto=format&fit=crop',
      title: 'Meet Noah',
    bio: "Hey! I'm Noah. I make math feel like a game rather than a chore. Whether it's fractions or geometry, I've got a fun way to explain it that actually makes sense.",
    sections: [
      {
        header: 'FAVORITE SUBJECT',
        content: 'Calculus and geometry. I love how shapes and numbers tell stories about the world around us. Let\'s solve some puzzles together!'
      },
      {
        header: "I'M WEIRDLY GOOD AT",
        content: "Mental math. Give me any two big numbers and I'll multiply them before you can even open your calculator app. Want to learn the trick?"
      }
    ]
  },
    {
      id: 'dominic',
      name: 'Dominic',
      subtitle: 'The History Buff',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop',
      title: 'Meet Dominic',
      bio: 'I travel through time to bring history to life. From Ancient Egypt to the Space Race, I have the inside scoop on the people and events that shaped our world.',
      sections: [
        {
          header: 'TIME TRAVEL DESTINATION',
          content: 'The Renaissance! Meeting Leonardo da Vinci was incredible—he had so many ideas for inventions that were way ahead of his time.'
        },
        {
          header: 'HISTORICAL SECRETS',
          content: 'Did you know that some Egyptian pharaohs used honey to keep flies away from them? History is full of weird and wonderful facts like that.'
        }
      ]
    },
    {
      id: 'ashley',
      name: 'Ashley',
      subtitle: 'The Science Star',
      avatar: 'https://images.unsplash.com/photo-1517677129300-07b130802f46?q=80&w=400&h=400&auto=format&fit=crop',
      title: 'Meet Ashley',
      bio: 'Hi! I’m Ashley, and I think the universe is the coolest playground ever. I love conducting experiments, exploring space, and figuring out how everything works at a molecular level.',
      sections: [
        {
          header: "FAVORITE EXPERIMENT",
          content: "Making elephant toothpaste! It's messy, it's foamy, and it's a great way to see a chemical reaction in action. Science is all about discovery."
        },
        {
          header: 'SPACE TRIVIA',
          content: "Venus is actually hotter than Mercury, even though it's further from the sun. It's because of its thick atmosphere! Crazy, right?"
        }
      ]
    },
    {
      id: 'charlie',
      name: 'Charlie',
      subtitle: 'The Coding Pro',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop',
      title: 'Meet Charlie',
      bio: 'I speak the language of computers. Whether it\'s building a website, a game, or a robot, I can show you how to turn your ideas into code. Let’s build something awesome!',
      sections: [
        {
          header: 'I GEEK OUT OVER',
          content: 'Clean code and elegant algorithms. But mostly, I love seeing what kids create when they first realize they have the power to build their own digital worlds.'
        },
        {
          header: 'CODING TIPS',
          content: 'Don\'t be afraid of bugs! Every error is just a puzzle waiting to be solved. Debugging is where the real learning happens.'
        }
      ],
      featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&h=400&auto=format&fit=crop'
    },
    {
      id: 'chloe',
      name: 'Chloe',
      subtitle: 'The Art Assistant',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&h=400&auto=format&fit=crop',
      title: 'Meet Chloe',
      bio: 'I believe everyone is an artist. I can help you with drawing, digital art, or even creative writing. Let’s explore your imagination and create something beautiful together.',
      sections: [
        {
          header: 'CREATIVE SPARK',
          content: "I love using AI to generate weird and wonderful prompts. Like 'a cat wearing a space suit riding a taco through a nebula'. Want to draw that?"
        },
        {
          header: 'ART HISTORY',
          content: "Did you know that some painters used to make their own paint from crushed bugs and berries? Art is as much about the materials as the message."
        }
      ]
    }
  ];

export default function PalsProfiles() {
  const [activePal, setActivePal] = useState(PALS_DATA[0]);

  return (
    <section className="relative py-[120px] bg-[#F1EEE9] overflow-hidden" id="pals">
        {/* Random Dithered Shapes */}
        <DitheredShape type="circle" size={120} className="absolute -left-10 top-20 opacity-20 rotate-12" />
        <DitheredShape type="square" size={80} className="absolute right-10 top-40 opacity-15 -rotate-12" />
        <DitheredShape type="triangle" size={150} className="absolute left-[15%] bottom-20 opacity-10 rotate-45" />
        <DitheredShape type="circle" size={100} className="absolute right-[5%] bottom-[10%] opacity-20" />
        <DitheredShape type="square" size={60} className="absolute left-[80%] top-[15%] opacity-15 rotate-12" />

        <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[64px] font-display leading-[1.2] mb-4">Learn with your AI Buddies</h2>
            <p className="text-[14px] font-sans text-muted-foreground">Select a buddy to start your learning journey. They adapt to your pace and interests.</p>
          </div>

        {/* OS Window Wrapper */}
        <div className="relative mx-auto max-w-[960px]">
          {/* Subtle background dithered pattern (simulated) */}
          <div className="absolute inset-0 -m-8 dither-overlay opacity-30 pointer-events-none" />
          
          <div className="os-window bg-[#F7F4EF] border border-black shadow-brutal flex flex-col min-h-[600px]">
            {/* Window Title Bar */}
            <div className="os-window-header border-b border-black h-8 flex items-center px-3 bg-white">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary border border-black flex-shrink-0" />
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold">SAY HI</span>
              </div>
              <div className="flex-grow flex items-center justify-center pointer-events-none">
                <div className="flex flex-col gap-[2px] w-full max-w-[400px]">
                  <div className="h-[1px] bg-black opacity-20 w-full" />
                  <div className="h-[1px] bg-black opacity-20 w-full" />
                  <div className="h-[1px] bg-black opacity-20 w-full" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 border border-black flex items-center justify-center p-1">
                  <div className="w-full h-full border-t-[3px] border-black" />
                </div>
                <div className="w-5 h-5 border border-black flex items-center justify-center">
                  <span className="text-xs leading-none">×</span>
                </div>
              </div>
            </div>

            {/* Window Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-[240px] border-r border-black flex flex-col bg-[#F7F4EF]">
                  <div className="p-4 border-b border-black">
                    <div className="flex items-center">
                      <span className="font-sans font-black text-[18px] tracking-tighter text-black flex items-center">
                        <span className="text-[22px] mr-1">◹</span>CLAYMINDAI
                      </span>
                    </div>
                  </div>
                
                <div className="p-3">
                  <div className="mb-4">
                    <div className="border border-black p-2 flex items-center justify-center bg-white shadow-brutal-sm cursor-pointer hover:bg-slate-50 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                  </div>

                  <div className="mb-2 uppercase text-[10px] font-mono text-muted-foreground font-bold tracking-widest pl-1">
                    MY PALS
                  </div>
                  
                  <nav className="space-y-1">
                    {PALS_DATA.map((pal) => (
                      <button
                        key={pal.id}
                        onClick={() => setActivePal(pal)}
                        className={`w-full text-left p-2 border flex items-center gap-3 transition-all ${
                          activePal.id === pal.id 
                            ? 'bg-white border-black shadow-brutal-sm' 
                            : 'border-transparent hover:border-black/20'
                        }`}
                      >
                        <div className="relative w-10 h-10 border border-black flex-shrink-0">
                          <img
                            src={pal.avatar}
                            alt={pal.name}
                            className="object-cover"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-[14px] font-bold leading-none mb-0.5">{pal.name}</div>
                          <div className="text-[10px] text-muted-foreground truncate">{pal.subtitle}</div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 overflow-y-auto bg-white relative">
                <div className="p-10">
                  {/* Floating Notification */}
                  <div className="absolute top-8 left-[340px] z-10 hidden lg:block">
                    <div className="relative bg-[#FF6B8B] text-black px-4 py-2 text-[12px] font-bold border border-black shadow-brutal-sm">
                      Click here to view another profile
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-black after:content-[''] after:absolute after:top-[-6px] after:right-[-9px] after:border-t-[6px] after:border-t-transparent after:border-b-[6px] after:border-b-transparent after:border-r-[6px] after:border-r-[#FF6B8B]" />
                    </div>
                  </div>

                  {/* Hero Window Section */}
                  <div className="border border-black p-1 bg-white shadow-brutal mb-12 relative">
                    <div className="border-2 border-black p-8 min-h-[280px] flex flex-col items-center justify-center text-center">
                      <h3 className="text-[72px] font-display italic leading-tight mb-8">
                        {activePal.title}
                      </h3>
                      <button className="brutal-btn bg-[#FF6B8B] hover:bg-[#ff859e] text-sm">
                        SAY HI
                      </button>
                    </div>
                  </div>

                  {/* Profile Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="col-span-full border-b border-black pb-2 flex items-baseline gap-10">
                      <h4 className="text-[32px] font-display italic">The basics</h4>
                      <h4 className="text-[32px] font-display italic">A little about me</h4>
                    </div>

                      <div className="space-y-4">
                        <p className="text-[16px] leading-relaxed">
                          {activePal.bio}
                        </p>
                        {'featuredImage' in activePal && activePal.featuredImage && (
                          <div className="relative w-full aspect-video border border-black mt-4 shadow-brutal-sm">
                            <img 
                              src={activePal.featuredImage as string} 
                              alt={`${activePal.name}'s workspace`}
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {activePal.sections.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <h5 className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">
                            {section.header}
                          </h5>
                          <p className="text-[12px] leading-relaxed text-slate-800">
                            {section.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}