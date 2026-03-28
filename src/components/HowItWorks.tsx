import { Search, UserCheck, MessageCircle, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { PageType } from '../App';

interface HowItWorksProps {
  onNavigate: (page: PageType) => void;
}

const steps = [
  {
    icon: Search,
    title: 'Search Properties',
    description: 'Browse thousands of verified listings across Zambia. Filter by location, price, type, and amenities.',
    color: '#52a447',
  },
  {
    icon: UserCheck,
    title: 'Verify & Compare',
    description: 'Every listing is KYC-verified. Compare properties side-by-side with real photos and owner details.',
    color: '#007786',
  },
  {
    icon: MessageCircle,
    title: 'Contact Directly',
    description: 'Message or call property owners directly. No middlemen, no hidden fees, no broker commissions.',
    color: '#52a447',
  },
  {
    icon: KeyRound,
    title: 'Move In or Buy',
    description: 'Finalize your deal with secure payment options. We provide legal support for every transaction.',
    color: '#007786',
  },
];

export function HowItWorks({ onNavigate }: HowItWorksProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#52a447] uppercase tracking-wider">Simple Process</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            How PropertyZM Works
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Find and secure your perfect property in just 4 simple steps. No brokers, no hassle.
          </p>
        </div>

        <div className="relative">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center group">
                {/* Step number circle */}
                <div className="relative z-10 mx-auto mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                    style={{ backgroundColor: step.color }}
                  >
                    {index + 1}
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="px-8"
            style={{ backgroundColor: '#52a447' }}
            onClick={() => onNavigate('rent')}
          >
            Start Your Search <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
