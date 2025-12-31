import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F1EEE9]">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <div className="mb-8 w-24 h-24 bg-[#FF6B8B] border-4 border-black shadow-brutal flex items-center justify-center rotate-3">
           <span className="font-bold text-4xl text-black">!</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-black mb-6 uppercase tracking-tighter text-black">
          Coming Soon
        </h1>
        <p className="font-ui-mono text-xl text-black/60 max-w-lg mx-auto leading-relaxed">
          We are currently hard at work building this section of the Claymind universe. 
          Check back shortly for updates.
        </p>
        <div className="mt-12 flex gap-4">
          <a href="/" className="bg-white border-4 border-black shadow-brutal px-8 py-4 font-black uppercase hover:translate-x-1 hover:translate-y-1 transition-transform">BACK TO HOME</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
