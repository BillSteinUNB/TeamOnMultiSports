import { Helmet } from 'react-helmet-async';
import HeroSection from '@/sections/HeroSection';
import CredibilityBar from '@/sections/CredibilityBar';
import WhoWeServeSection from '@/sections/WhoWeServeSection';
import AboutSection from '@/sections/AboutSection';
import ProgramsSection from '@/sections/ProgramsSection';
import ResultsSection from '@/sections/ResultsSection';
import CTASection from '@/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>TeamON Multisports | Athlete Development & Coach Mentorship</title>
        <meta name="description" content="TeamON Multisports supports endurance athletes, youth development, and coach mentorship through practical, human coaching led by Michael On." />
      </Helmet>
      <HeroSection />
      <WhoWeServeSection />
      <AboutSection />
      <CredibilityBar />
      <ProgramsSection />
      <ResultsSection />
      <CTASection />
    </>
  );
}
