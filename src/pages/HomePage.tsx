import { Helmet } from 'react-helmet-async';
import HeroSection from '@/sections/HeroSection';
import CredibilityBar from '@/sections/CredibilityBar';
import WhoWeServeSection from '@/sections/WhoWeServeSection';
import DifferentiationSection from '@/sections/DifferentiationSection';
import AboutSection from '@/sections/AboutSection';
import ProgramsSection from '@/sections/ProgramsSection';
import ResultsSection from '@/sections/ResultsSection';
import PhilosophySection from '@/sections/PhilosophySection';
import CTASection from '@/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>TeamOn Multisports | Endurance Coaching</title>
        <meta name="description" content="Science-backed triathlon and run coaching for athletes pursuing performance goals." />
      </Helmet>
      <HeroSection />
      <CredibilityBar />
      <WhoWeServeSection />
      <DifferentiationSection />
      <AboutSection />
      <ProgramsSection />
      <ResultsSection />
      <PhilosophySection />
      <CTASection />
    </>
  );
}
