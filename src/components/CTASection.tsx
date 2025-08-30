import { Button } from './ui/button';
import { PageType } from '../App';

interface CTASectionProps {
  onNavigate: (page: PageType) => void;
}

export function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Find Your Perfect Property?
        </h2>
        <p className="text-xl text-green-100 mb-8">
          Join thousands of Zambians who trust PropertyZM for their real estate needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 px-8"
            onClick={() => onNavigate('rent')}
          >
            Start Searching
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-primary px-8"
            onClick={() => onNavigate('post-property')}
          >
            Post Your Property
          </Button>
        </div>
      </div>
    </section>
  );
}