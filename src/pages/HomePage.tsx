import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { PropertiesSection } from '../components/PropertiesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { PageType } from '../App';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <FeaturesSection />
      <PropertiesSection />
      <TestimonialsSection />
      <CTASection onNavigate={onNavigate} />
    </>
  );
}