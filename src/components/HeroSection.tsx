import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Search, MapPin, Home, Building, TreePine, GraduationCap, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageType } from '../App';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onNavigate: (page: PageType) => void;
}

const rotatingTexts = ['Home', 'Apartment', 'Office', 'Land', 'Boarding'];

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [searchType, setSearchType] = useState('rent');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchType === 'rent') onNavigate('rent');
    else if (searchType === 'buy') onNavigate('buy');
    else if (searchType === 'boarding') onNavigate('boarding');
    else onNavigate('commercial');
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-green-50/30 py-12 lg:py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#52a447]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#007786]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-5">
              {/* Urgency badge */}
              <div className="inline-flex items-center bg-[#52a447]/10 text-[#52a447] rounded-full px-4 py-1.5 text-sm font-semibold">
                <span className="w-2 h-2 bg-[#52a447] rounded-full mr-2 animate-pulse" />
                47 new listings added today
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Find Your Perfect{' '}
                <span className="relative inline-block">
                  <span className="text-[#52a447]">{rotatingTexts[currentTextIndex]}</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#52a447]/30 rounded-full" />
                </span>
                <br />
                <span className="text-gray-900">in Zambia</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Connect directly with property owners. <span className="font-semibold text-gray-800">Zero broker fees.</span>{' '}
                <span className="font-semibold text-gray-800">100% verified listings.</span>{' '}
                Zambia's most trusted property platform.
              </p>
            </div>

            {/* Search Card */}
            <Card className="p-5 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              {/* Search Type Tabs */}
              <div className="flex space-x-2 mb-5 overflow-x-auto pb-1">
                {[
                  { id: 'rent', label: 'Rent', icon: Home },
                  { id: 'buy', label: 'Buy', icon: Building },
                  { id: 'land', label: 'Land', icon: TreePine },
                  { id: 'boarding', label: 'Boarding', icon: GraduationCap },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSearchType(id)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                      searchType === id
                        ? 'bg-[#52a447] text-white shadow-md shadow-[#52a447]/25'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Search Form */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative md:col-span-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Location (Lusaka, Ndola, Kitwe...)"
                    className="pl-10 h-12 bg-gray-50"
                  />
                </div>

                <Select>
                  <SelectTrigger className="h-12 bg-gray-50">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  className="h-12 font-semibold shadow-md shadow-[#52a447]/25"
                  style={{ backgroundColor: '#52a447' }}
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Quick links */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">Popular:</span>
                {['Kabulonga', 'Rhodespark', 'Woodlands', 'Chalala'].map((area) => (
                  <button
                    key={area}
                    onClick={() => onNavigate('rent')}
                    className="text-sm text-[#007786] hover:text-[#005f6b] font-medium transition-colors"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </Card>

            {/* Social proof below search */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {['J', 'M', 'G', 'P'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-semibold shadow-md"
                    style={{ backgroundColor: i % 2 === 0 ? '#52a447' : '#007786' }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm font-semibold text-gray-900 ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-gray-500">Rated by 2,400+ users across Zambia</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZnJpY2FuJTIwaG9tZSUyMGx1eHVyeXxlbnwxfHx8fDE3NzM3NDA1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern Zambian home"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-[#52a447]/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#52a447]" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">100% Verified</div>
                  <div className="text-sm text-gray-500">KYC-checked owners</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-[#007786]/10 flex items-center justify-center">
                  <span className="text-lg">K0</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Zero Commission</div>
                  <div className="text-sm text-gray-500">Direct owner contact</div>
                </div>
              </div>
            </motion.div>

            {/* Savings badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute top-1/2 -left-8 bg-[#52a447] text-white rounded-xl px-4 py-3 shadow-xl"
            >
              <div className="text-xs font-medium opacity-90">Users Save Avg.</div>
              <div className="text-xl font-bold">K2,500+</div>
              <div className="text-xs opacity-80">on broker fees</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
