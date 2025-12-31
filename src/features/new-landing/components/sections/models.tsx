
const Models = () => {
  return (
    <section className="bg-[#F1EEE9] py-[120px] px-6">
      <div className="max-width-[1280px] mx-auto">
        {/* OS Window Wrapper */}
        <div className="border border-black bg-white shadow-[6px_6px_0px_#000000] overflow-hidden">
          {/* Window Title Bar */}
          <div className="h-[32px] border-b border-black flex items-center px-3 bg-white justify-between">
            <div className="flex items-center gap-2">
              <div className="w-[12px] h-[12px] bg-[#39E17F] border border-black" />
              <span className="font-mono text-[12px] uppercase tracking-wider">Models</span>
            </div>
            <div className="flex-1 mx-4 flex flex-col justify-center gap-[2px]">
              <div className="h-[1px] bg-black opacity-20 w-full" />
              <div className="h-[1px] bg-black opacity-20 w-full" />
              <div className="h-[1px] bg-black opacity-20 w-full" />
            </div>
            <div className="flex items-center">
              <div className="w-[14px] h-[14px] border border-black relative">
                <div className="absolute inset-[2px] border border-black opacity-30" />
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[40%_60%] border-b border-black">
            {/* Left Content Area (Pink Background) */}
            <div className="bg-[#FF6B8B] p-10 flex flex-col border-r border-black">
              <div className="mb-8">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/svgs/68f654e58239ee255621c07c_models-icon-6.svg"
                  alt="Models icon"
                  width={64}
                  height={64}
                  className="mb-8"
                />
                <h2 className="font-display text-[64px] leading-[1.1] mb-6">Models</h2>
                <p className="font-sans text-[14px] leading-[1.6] max-w-[320px] mb-8">
                  We build models that teach machines perception, empathy, and expression so AI can finally understand the world as we do.
                </p>
                <button className="bg-[#FF6B8B] border-2 border-black shadow-[4px_4px_0px_#000000] px-6 py-3 font-mono text-[12px] uppercase font-bold hover:translate-x-[2px] hover:translate-y-[2px] transition-transform active:shadow-[2px_2px_0px_#000000]">
                  Our Research
                </button>
              </div>
            </div>

            {/* Right Visual Area (Birds on Wire Art) */}
            <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-[#89CFF0]">
               <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/caf4db2a-9a39-49f0-8414-6a2e71f7c407-claymind.ai/assets/images/68fbd348e3cc27dfbff98c1e_models-birds-30.avif"
                  alt="Birds on a wire"
                  fill
                  className="object-cover"
                  priority
               />
               {/* Scanlines overlay effect to match the brand UI */}
               <div className="absolute inset-0 pointer-events-none dither-overlay opacity-20" />
            </div>
          </div>

          {/* Bottom Models Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 bg-[#FFB6C1]">
            {/* Phoenix Card */}
            <div className="p-8 border-r border-black last:border-r-0 md:min-h-[320px]">
              <div className="font-mono text-[10px] uppercase mb-6 opacity-60">Rendering</div>
              <h3 className="font-sans text-[32px] font-semibold mb-4">Phoenix [4]</h3>
              <p className="font-sans text-[14px] leading-[1.6]">
                Phoenix-4, a gaussian-diffusion rendering model developed to synthesize high-fidelity facial behavior at the speed of human interaction, is the result of building real-time facial animation systems that reproduce subtle, temporally consistent expressions with precise control over motion and identity.
              </p>
            </div>

            {/* Raven Card */}
            <div className="p-8 border-r border-black last:border-r-0 md:min-h-[320px]">
              <div className="font-mono text-[10px] uppercase mb-6 opacity-60">Perception</div>
              <h3 className="font-sans text-[32px] font-semibold mb-4">Raven [1]</h3>
              <p className="font-sans text-[14px] leading-[1.6]">
                Raven-1, a novel multimodal perception model designed to unify object recognition, emotion detection, and adaptive attention within a single contextual framework, emerged from modeling how machines interpret people and environments by integrating visual input, emotional signals, and spatial relationships.
              </p>
            </div>

            {/* Sparrow Card */}
            <div className="p-8 last:border-r-0 md:min-h-[320px]">
              <div className="font-mono text-[10px] uppercase mb-6 opacity-60">Emotional Understanding</div>
              <h3 className="font-sans text-[32px] font-semibold mb-4">Sparrow [1]</h3>
              <p className="font-sans text-[14px] leading-[1.6]">
                Sparrow-1, a transformer-based dialogue model that captures conversational timing, responsiveness, and humanlike interaction flow using multimodal alignment techniques, embodies research into parsing communicative intent, emotional state, and turn-level structure across voice, language, and gesture.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Branding */}
      <div className="mt-20 overflow-hidden select-none pointer-events-none opacity-10">
        <div className="flex whitespace-nowrap gap-20">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="font-display text-[120px] italic">foundational models</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Models;