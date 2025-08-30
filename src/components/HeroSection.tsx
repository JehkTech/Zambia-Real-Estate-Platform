import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Search, MapPin, Home, Building, TreePine } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageType } from '../App';

interface HeroSectionProps {
  onNavigate: (page: PageType) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [searchType, setSearchType] = useState('rent');

  const handleSearch = () => {
    if (searchType === 'rent') {
      onNavigate('rent');
    } else if (searchType === 'buy') {
      onNavigate('buy');
    } else {
      onNavigate('commercial');
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Find Your Perfect 
                <span className="block text-primary">Home in Zambia</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect directly with property owners. No brokers, no commission fees. 
                Transparent, trusted, and tailored for Zambia.
              </p>
            </div>

            {/* Search Card */}
            <Card className="p-6 shadow-xl border-0">
              {/* Search Type Tabs */}
              <div className="flex space-x-4 mb-6">
                {[
                  { id: 'rent', label: 'Rent', icon: Home },
                  { id: 'buy', label: 'Buy', icon: Building },
                  { id: 'land', label: 'Land', icon: TreePine },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSearchType(id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      searchType === id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Search Form */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Location (Lusaka, Ndola, Kitwe...)"
                    className="pl-10 h-12"
                  />
                </div>
                
                <Select>
                  <SelectTrigger className="h-12">
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
                  className="h-12 font-semibold"
                  style={{ backgroundColor: '#52a447' }}
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5,000+</div>
                  <div className="text-sm text-gray-600">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">15+</div>
                  <div className="text-sm text-gray-600">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,200+</div>
                  <div className="text-sm text-gray-600">Verified Owners</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/api/placeholder/600/500"
                alt="Modern Zambian home"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Verified Properties</div>
                  <div className="text-sm text-gray-600">100% KYC verified owners</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-lg">🏠</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">No Commission</div>
                  <div className="text-sm text-gray-600">Direct owner contact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}