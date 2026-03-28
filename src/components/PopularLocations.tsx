import { MapPin, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageType } from '../App';

interface PopularLocationsProps {
  onNavigate: (page: PageType) => void;
}

const locations = [
  {
    name: 'Kabulonga',
    city: 'Lusaka',
    properties: 342,
    avgPrice: 'K3,500/mo',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZnJpY2FuJTIwaG9tZSUyMGx1eHVyeXxlbnwxfHx8fDE3NzM3NDA1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    trending: true,
  },
  {
    name: 'Rhodespark',
    city: 'Lusaka',
    properties: 218,
    avgPrice: 'K2,800/mo',
    image: 'https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzczNzEwMzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    trending: false,
  },
  {
    name: 'Woodlands',
    city: 'Lusaka',
    properties: 189,
    avgPrice: 'K2,200/mo',
    image: 'https://images.unsplash.com/photo-1772340163991-40eacaa11740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3duaG91c2UlMjBzdWJ1cmJhbiUyMG5laWdoYm9yaG9vZHxlbnwxfHx8fDE3NzM3NDA1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    trending: false,
  },
  {
    name: 'Chalala',
    city: 'Lusaka',
    properties: 156,
    avgPrice: 'K4,000/mo',
    image: 'https://images.unsplash.com/photo-1679364297777-1db77b6199be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yJTIwZ2FyZGVufGVufDF8fHx8MTc3Mzc0MDU1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    trending: true,
  },
  {
    name: 'CBD',
    city: 'Lusaka',
    properties: 275,
    avgPrice: 'K5,500/mo',
    image: 'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzczNjg4NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    trending: false,
  },
  {
    name: 'Roma',
    city: 'Lusaka',
    properties: 143,
    avgPrice: 'K3,200/mo',
    image: 'https://images.unsplash.com/photo-1626075246403-544a14566c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob21lJTIwYmFja3lhcmQlMjBwYXRpb3xlbnwxfHx8fDE3NzM3NDA1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    trending: false,
  },
];

export function PopularLocations({ onNavigate }: PopularLocationsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-[#007786] uppercase tracking-wider">Explore Areas</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Popular Locations in Lusaka</h2>
            <p className="text-gray-600 mt-2">Browse properties in Zambia's most sought-after neighborhoods</p>
          </div>
          <button
            onClick={() => onNavigate('rent')}
            className="hidden md:flex items-center text-[#007786] hover:text-[#005f6b] transition-colors font-semibold"
          >
            View All Areas <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {locations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => onNavigate('rent')}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <ImageWithFallback
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {loc.trending && (
                <div className="absolute top-3 left-3 bg-[#52a447] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Trending
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <div className="text-white font-semibold">{loc.name}</div>
                <div className="flex items-center text-white/80 text-xs mt-0.5">
                  <MapPin className="w-3 h-3 mr-1" />
                  {loc.city}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#52a447] text-xs font-semibold">{loc.properties} listings</span>
                  <span className="text-white/70 text-[10px]">avg. {loc.avgPrice}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigate('rent')}
          className="md:hidden flex items-center justify-center w-full mt-6 text-[#007786] font-semibold"
        >
          View All Areas <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </section>
  );
}
