import { Button } from './ui/button';
import { PageType } from '../App';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';

interface CTASectionProps {
  onNavigate: (page: PageType) => void;
}

export function CTASection({ onNavigate }: CTASectionProps) {
  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#52a447' }}>
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center bg-white/20 text-white rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
          238 new users joined today
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Stop Paying Broker Fees.
          <br />
          Start Saving with PropertyZM.
        </h2>
        <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
          Join 12,000+ Zambians who connect directly with property owners and save an average of K5,200 per transaction
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Button
            size="lg"
            className="bg-white text-[#52a447] hover:bg-gray-100 px-8 shadow-xl shadow-black/10"
            onClick={() => onNavigate('rent')}
          >
            Find a Property <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-[#52a447] px-8 bg-transparent"
            onClick={() => onNavigate('post-property')}
          >
            List Your Property Free
          </Button>
        </div>

        {/* Trust points */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Free to browse</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">No hidden fees</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">KYC verified owners</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span className="text-sm">24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
