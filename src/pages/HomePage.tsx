import { TrustBar } from '../components/TrustBar';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { PopularLocations } from '../components/PopularLocations';
import { PropertiesSection } from '../components/PropertiesSection';
import { HowItWorks } from '../components/HowItWorks';
import { StatsCounter } from '../components/StatsCounter';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { SocialProofPopup } from '../components/SocialProofPopup';
import { PageType } from '../App';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      <TrustBar />
      <HeroSection onNavigate={onNavigate} />
      <FeaturesSection />
      <PopularLocations onNavigate={onNavigate} />
      <PropertiesSection />
      <HowItWorks onNavigate={onNavigate} />
      <StatsCounter />
      <TestimonialsSection />
      <CTASection onNavigate={onNavigate} />
      <SocialProofPopup />
    </>
  );
}
