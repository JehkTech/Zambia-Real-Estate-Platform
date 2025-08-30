import { useState } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Filter, Grid, List, SlidersHorizontal, Search, MapPin } from 'lucide-react';
import { PageType } from '../App';

interface RentPageProps {
  onNavigate: (page: PageType) => void;
}

// Mock data for rental properties
const rentProperties = [
  {
    id: '1',
    title: 'Modern 3-Bedroom Apartment in Kabulonga',
    price: 'K3,500',
    location: 'Kabulonga, Lusaka',
    type: 'rent',
    bedrooms: 3,
    bathrooms: 2,
    area: '120 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: true,
    owner: { name: 'John Mwanza', phone: '+260977123456', verified: true }
  },
  {
    id: '2',
    title: 'Furnished 2-Bedroom in Rhodespark',
    price: 'K2,800',
    location: 'Rhodespark, Lusaka',
    type: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    area: '90 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Mary Banda', phone: '+260966789012', verified: true }
  },
  {
    id: '3',
    title: 'Spacious 4-Bedroom House',
    price: 'K5,200',
    location: 'Chalala, Lusaka',
    type: 'rent',
    bedrooms: 4,
    bathrooms: 3,
    area: '250 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: true,
    owner: { name: 'David Ng\'oma', phone: '+260955345678', verified: true }
  },
  {
    id: '4',
    title: 'Cozy 1-Bedroom Flat',
    price: 'K1,800',
    location: 'Woodlands, Lusaka',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    area: '60 sqm',
    image: '/api/placeholder/400/300',
    verified: false,
    featured: false,
    owner: { name: 'Sarah Phiri', phone: '+260944567890', verified: false }
  },
  {
    id: '5',
    title: 'Executive 3-Bedroom with Garden',
    price: 'K4,000',
    location: 'Avondale, Lusaka',
    type: 'rent',
    bedrooms: 3,
    bathrooms: 2,
    area: '180 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Peter Katongo', phone: '+260933123789', verified: true }
  },
  {
    id: '6',
    title: 'Family Home in Roma',
    price: 'K3,200',
    location: 'Roma, Lusaka',
    type: 'rent',
    bedrooms: 3,
    bathrooms: 2,
    area: '150 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Grace Mulenga', phone: '+260922456123', verified: true }
  }
];

export function RentPage({ onNavigate }: RentPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Rent Properties in Zambia</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover affordable rental properties with verified landlords. Direct contact, no agent fees.
            </p>
          </div>

          {/* Quick Search */}
          <Card className="p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Location (Lusaka, Ndola, Kitwe...)"
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2k">K0 - K2,000</SelectItem>
                  <SelectItem value="2k-4k">K2,000 - K4,000</SelectItem>
                  <SelectItem value="4k-6k">K4,000 - K6,000</SelectItem>
                  <SelectItem value="6k+">K6,000+</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-secondary hover:bg-secondary/90">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Properties for Rent ({rentProperties.length} listings)
              </h2>
              <p className="text-gray-600">Available rental properties from verified landlords</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              {/* View Toggle */}
              <div className="flex bg-white rounded-lg p-1 shadow-sm">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-primary' : ''}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-primary' : ''}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </Button>

              {/* Sort */}
              <Select defaultValue="price-low">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="area">By Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="flat">Flat</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furnished">Furnished</SelectItem>
                      <SelectItem value="semi-furnished">Semi Furnished</SelectItem>
                      <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Areas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kabulonga">Kabulonga</SelectItem>
                      <SelectItem value="rhodespark">Rhodespark</SelectItem>
                      <SelectItem value="woodlands">Woodlands</SelectItem>
                      <SelectItem value="chalala">Chalala</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rent: K{priceRange[0]} - K{priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    step={200}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Active filters:</span>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Available Now</span>
                  <button className="ml-1 text-xs">×</button>
                </Badge>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Verified Landlords</span>
                  <button className="ml-1 text-xs">×</button>
                </Badge>
              </div>
            </Card>
          )}

          {/* Properties Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {rentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8"
            >
              Load More Properties
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}