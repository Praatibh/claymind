import { useEffect } from "react";
import "../styles/landing.css";
import Navbar from "../components/sections/navbar";
import HeroSection from "../components/sections/hero";
import LogoMarquee from "../components/sections/logo-marquee";
import HumanMachineDivide from "../components/sections/human-machine-divide";
import MeetPals from "../components/sections/meet-pals";
import FeaturesGrid from "../components/sections/features-grid";
import PalsProfiles from "../components/sections/pals-profiles";
import HumanComputingCompany from "../components/sections/human-computing-company";
import CtaFooterTease from "../components/sections/cta-footer-tease";
import Footer from "../components/sections/footer";

export default function LandingPage() {
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
    <div className="landing-page flex flex-col min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <LogoMarquee />
        <HumanMachineDivide />
        <MeetPals />
        <FeaturesGrid />
        <PalsProfiles />
        <HumanComputingCompany />
        <CtaFooterTease />
      </main>
      <Footer />
    </div>
  );
}