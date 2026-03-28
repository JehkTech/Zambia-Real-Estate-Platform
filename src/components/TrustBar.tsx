import { Shield, Award, Clock, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export function TrustBar() {
  return (
    <div className="bg-gray-900 text-white py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-y-2">
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <Shield className="w-4 h-4 text-[#52a447]" />
              <span className="text-sm">
                <AnimatedCounter target={5200} suffix="+" /> Verified Listings
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 whitespace-nowrap">
              <Users className="w-4 h-4 text-[#52a447]" />
              <span className="text-sm">
                <AnimatedCounter target={12000} suffix="+" /> Happy Users
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-2 whitespace-nowrap">
              <Award className="w-4 h-4 text-[#52a447]" />
              <span className="text-sm">Zambia's #1 Property Platform</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2 whitespace-nowrap">
              <Clock className="w-4 h-4 text-[#52a447]" />
              <span className="text-sm">Avg. 3-Day Tenant Match</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1.5">
              {['J', 'M', 'G', 'P', 'S'].map((letter, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center text-[10px]"
                  style={{ backgroundColor: i % 2 === 0 ? '#52a447' : '#007786' }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-400 ml-2 hidden sm:inline">+238 joined today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
