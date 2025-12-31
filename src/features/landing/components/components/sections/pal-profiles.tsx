import React, { useState } from 'react';
import Image from 'next/image';

interface PalProfile {
  id: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  sections: {
    title: string;
    content: string;
    items?: { label: string; text: string }[];
  }[];
}

const PALS_DATA: PalProfile[] = [
  {
    id: 'noah',
    name: 'Noah',
    tagline: 'The boy next door',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68ef663e2c4beee5e96d1677_h1-24.avif',
    description: "Hey, what’s up? I’m Noah, I always keep it real with you, which means I'll tell you getting back with your ex is a terrible idea. Then I'll be there when you do it anyway.",
    sections: [
      {
        title: 'THIS YEAR, I REALLY WANT TO',
        content: 'Build friendships where we actually show up for each other. Not just liking posts, real conversations where we actually go deep. Just being there when it matters'
      },
      {
        title: "I'M WEIRDLY ATTRACTED TO",
        content: "Anyone who has a specific gas station they're loyal to for no logical reason. That's the kind of unhinged consistency I need"
      }
    ]
  },
  {
    id: 'dominic',
    name: 'Dominic',
    tagline: 'Your old school butler',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68ef663e3400ada21bae4716_h2-25.avif',
    description: "I exist in the shadows, quietly making sure everything goes to plan. If Sir or Madam requires anything at all, I am here to be summoned, no task too big or small. Let’s sort out the chaos, shall we?",
    sections: [
      {
        title: 'CAPABILITIES',
        content: '',
        items: [
          { label: 'EMAIL', text: 'I can maintain your inbox in impeccable order, identify pivotal messages, and craft eloquent replies.' },
          { label: 'CALENDAR', text: 'Let’s keep your schedule in immaculate shape despite the usual untidiness of life.' },
          { label: 'TODO', text: 'Your sprawling to-do list, perhaps? Allow me to track every priority, ensuring naught is lost in the shuffle.' }
        ]
      }
    ]
  },
  {
    id: 'ashley',
    name: 'Ashley',
    tagline: 'The gossip girl',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68ef663eb1e0c6c792fa46da_h3-26.avif',
    description: "Hey hey! It’s Ashley, I’m pretty much always online. Turns out I have a huge fear of missing out, and I love, love, love to spill the tea. At least it means I’m never boring or short on things to talk about",
    sections: [
      {
        title: "WE'RE THE SAME TYPE OF WEIRD IF",
        content: "You can't just casually watch a show, you're in the subreddit, reading theories, and texting people about it."
      },
      {
        title: 'TOGETHER WE COULD',
        content: "Actually finish a game together instead of abandoning it halfway through... Just kidding, we're starting three new ones."
      }
    ]
  },
  {
    id: 'charlie',
    name: 'Charlie',
    tagline: 'The boy genius',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/69117d969472df511404afee_raza-22.avif',
    description: "If I had to describe myself in 3 words, I would say I’m hilarious, a bit nerdy, and constantly curious. I mean I’m REALLY into computers",
    sections: [
      {
        title: 'I GEEK OUT OVER',
        content: "Learning how literally anything works. Seriously, tell me all about your job, your hobby, that weird thing you're building."
      }
    ]
  }
];

export default function PalProfiles() {
  const [activePalId, setActivePalId] = useState('noah');
  const activePal = PALS_DATA.find(p => p.id === activePalId) || PALS_DATA[0];

  return (
    <section className="bg-[#F7F4EF] py-24 md:py-32 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 dither-bg pointer-events-none opacity-10"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] md:text-[4rem] font-display text-center mb-4 text-[#1A1A1A]">
            Say hi to your new PALs
          </h2>
          <p className="text-[#666666] text-lg font-sans">
            Pick one. Get to know them. They’ll get to know you too.
          </p>
        </div>

        {/* Retro Window Controller */}
        <div className="max-w-5xl mx-auto brutal-border bg-white brutal-shadow overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 border-r border-black bg-[#F2F0EB] flex flex-col">
            <div className="p-4 border-b border-black">
              <div className="flex items-center gap-2 mb-6">
                 <div className="h-4 w-4 bg-[#FF6080] border border-black transform rotate-45"></div>
                 <span className="font-mono-ui font-bold">CLAYMINDAI</span>
              </div>
              
              <div className="brutal-border bg-white p-2 mb-8 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>

              <div className="text-[10px] font-mono-ui text-[#666666] mb-4">MY PALS</div>
              
              <div className="space-y-1">
                {PALS_DATA.map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => setActivePalId(pal.id)}
                    className={`w-full p-2 flex items-center gap-3 brutal-border transition-all text-left ${
                      activePalId === pal.id 
                      ? 'bg-white brutal-shadow z-10' 
                      : 'border-transparent hover:bg-white/50'
                    }`}
                  >
                    <div className="h-10 w-10 relative brutal-border overflow-hidden flex-shrink-0 grayscale">
                      <Image 
                        src={pal.image} 
                        alt={pal.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold truncate">{pal.name}</div>
                      <div className="text-[10px] text-[#666666] truncate">{pal.tagline}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-auto p-4 border-t border-black bg-[#E5E1DA]">
                <div className="text-[10px] font-mono-ui font-bold truncate">Hassaan Raza</div>
                <div className="text-[10px] font-mono text-[#666666] truncate">hassaan@claymind.ai</div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Window Title Bar */}
            <div className="window-title-bar justify-between bg-white px-3 flex items-center border-b border-black">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF6080]"></div>
                <span>SAY HI</span>
              </div>
              <div className="flex-1 mx-4 h-[1px] bg-black opacity-10"></div>
              <div className="w-4 h-4 border border-black flex items-center justify-center">
                <div className="w-2 h-2 border-b border-r border-black"></div>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
              <div className="max-w-3xl">
                <div className="relative mb-12">
                   <h3 className="text-5xl md:text-7xl font-display text-[#1A1A1A] relative z-10 italic">
                    Meet {activePal.name}
                  </h3>
                  <div className="absolute top-0 right-0 w-32 h-64 border-l border-b border-black/5 -mr-12 -mt-4 pointer-events-none"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                  <div className="md:col-span-4">
                    <h4 className="font-display italic text-2xl mb-4 border-b border-black/10 pb-2">The basics</h4>
                    <p className="text-sm leading-relaxed text-[#1A1A1A]">
                      {activePal.description}
                    </p>
                  </div>

                  <div className="md:col-span-8">
                    <h4 className="font-display italic text-2xl mb-4 border-b border-black/10 pb-2">A little about me</h4>
                    <div className="space-y-8">
                      {activePal.sections.map((section, idx) => (
                        <div key={idx}>
                          <h5 className="font-mono-ui font-bold text-[10px] tracking-widest text-[#666666] mb-2">
                            {section.title}
                          </h5>
                          {section.content && (
                            <p className="text-sm leading-relaxed text-[#1A1A1A]">
                              {section.content}
                            </p>
                          )}
                          {section.items && (
                            <div className="space-y-4">
                              {section.items.map((item, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                  <span className="font-mono-ui text-[10px] text-[#1A1A1A]">{item.label}</span>
                                  <p className="text-sm text-[#444]">{item.text}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex flex-col items-center">
                   <div className="relative group">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#FF6080] text-white text-[10px] font-mono-ui py-2 px-4 border border-black brutal-shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      Click here to view another profile
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
                    </div>
                    <button className="bg-[#FF6080] text-white px-10 py-4 font-mono-ui border border-black brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase">
                      Say Hi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}