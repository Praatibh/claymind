import { Link } from 'react-router-dom';

/**
 * HumanComputingCompany Section
 * Clones the "The human computing company" mission statement section.
 * Features a large pixel-art style portrait and a descriptive text block.
 */
export default function HumanComputingCompany() {
  const missionImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/6904ecb796a3a4e6677d57b1_0d6518f118014c5cbc6b19710-28.avif";

  return (
    <section className="bg-[#F1EEE9] py-[120px] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Pixelated Artistic Portrait */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            <div className="relative w-max">
              {/* Main Image with Dither/Pixelated Look */}
              <div className="relative border border-black shadow-[6px_6px_0px_#000000] overflow-hidden">
                <img
                  src={missionImage}
                  alt="Artistic pixel-constructed portrait looking upward"
                  width={560}
                  height={560}
                  className="w-full h-auto object-cover"
                />
                {/* Dither pattern overlay layer (simulated via CSS pattern) */}
                <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay dither-overlay"></div>
              </div>
              
              {/* Stylized background decorative elements (simulating the "cubes/pixels" floating around) */}
              <div className="absolute -top-10 -left-10 w-24 h-24 border border-black/10 pointer-events-none hidden md:block"></div>
              <div className="absolute top-20 -right-8 w-16 h-16 border border-black/20 pointer-events-none hidden md:block"></div>
            </div>
          </div>

          {/* Right Side: Mission Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
              <h2 className="font-display text-[48px] md:text-[64px] leading-[1.1] text-black mb-8">
                Empowering the next generation
              </h2>
              
              <div className="max-w-[500px] space-y-6">
                <p className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-black/80">
                  ClaymindAI is an education-first AI lab dedicated to teaching children how to use artificial intelligence responsibly and creatively. We build friendly AI buddies that help kids learn.
                </p>
                
                <p className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-black/80">
                  We believe that every child should have a personal AI tutor that helps them unlock their full potential and prepare for a future where AI is everywhere.
                </p>
              </div>

              {/* Brutalist Button */}
              <div className="mt-10">
                <a 
                  href="/about" 
                  className="inline-block group relative"
                >
                  <button className="bg-white border-2 border-black px-6 py-3 font-mono text-[12px] uppercase tracking-wider font-bold shadow-[4px_4px_0px_#000000] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000]">
                    Learn more about us
                  </button>
                </a>
              </div>
            </div>

        </div>
      </div>

    </section>
  );
}