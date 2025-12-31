import Navbar from "@/features/landing/components/sections/navbar";
import HeroSection from "@/features/landing/components/sections/hero";
import LogoMarquee from "@/features/landing/components/sections/logo-marquee";
import HumanMachineDivide from "@/features/landing/components/sections/human-machine-divide";
import MeetPals from "@/features/landing/components/sections/meet-pals";
import FeaturesGrid from "@/features/landing/components/sections/features-grid";
import PalsProfiles from "@/features/landing/components/sections/pals-profiles";
import HumanComputingCompany from "@/features/landing/components/sections/human-computing-company";
import CtaFooterTease from "@/features/landing/components/sections/cta-footer-tease";
import Footer from "@/features/landing/components/sections/footer";
import "@/features/landing/styles/landing.css";

export default function LandingScreen() {
  return (
    <div className="flex flex-col min-h-screen">
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
