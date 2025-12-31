import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/landing.css";
import Navbar from "../components/sections/navbar";
import Footer from "../components/sections/footer";

interface ComingSoonPageProps {
  title?: string;
}

export default function ComingSoonPage({ title }: ComingSoonPageProps) {
  // Load Google Fonts for landing page
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="landing-page flex flex-col min-h-screen bg-[#F1EEE9]">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <div className="mb-8 w-24 h-24 bg-[#FF6B8B] border-4 border-black shadow-[6px_6px_0px_#000000] flex items-center justify-center rotate-3">
          <span className="font-bold text-4xl text-black">!</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-black mb-6 uppercase tracking-tighter text-black">
          {title || 'Coming Soon'}
        </h1>
        <p className="font-ui-mono text-xl text-black/60 max-w-lg mx-auto leading-relaxed">
          We are currently hard at work building this section of the Claymind universe.
          Check back shortly for updates.
        </p>
        <div className="mt-12 flex gap-4">
          <Link
            to="/"
            className="bg-white border-4 border-black shadow-[6px_6px_0px_#000000] px-8 py-4 font-black uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000000] transition-all"
          >
            BACK TO HOME
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
