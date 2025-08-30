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

interface BuyPageProps {
  onNavigate: (page: PageType) => void;
}

// Mock data for properties for sale
const buyProperties = [
  {
    id: '1',
    title: 'Executive 4-Bedroom House in Kabulonga',
    price: 'K1,250,000',
    location: 'Kabulonga, Lusaka',
    type: 'buy',
    bedrooms: 4,
    bathrooms: 3,
    area: '280 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: true,
    owner: { name: 'John Mwanza', phone: '+260977123456', verified: true }
  },
  {
    id: '2',
    title: 'Modern 3-Bedroom Townhouse',
    price: 'K850,000',
    location: 'Rhodespark, Lusaka',
    type: 'buy',
    bedrooms: 3,
    bathrooms: 2,
    area: '180 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Mary Banda', phone: '+260966789012', verified: true }
  },
  {
    id: '3',
    title: 'Luxury 5-Bedroom Villa with Pool',
    price: 'K2,500,000',
    location: 'Chalala, Lusaka',
    type: 'buy',
    bedrooms: 5,
    bathrooms: 4,
    area: '400 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: true,
    owner: { name: 'David Ng\'oma', phone: '+260955345678', verified: true }
  },
  {
    id: '4',
    title: 'Starter 2-Bedroom House',
    price: 'K450,000',
    location: 'Woodlands, Lusaka',
    type: 'buy',
    bedrooms: 2,
    bathrooms: 1,
    area: '120 sqm',
    image: '/api/placeholder/400/300',
    verified: false,
    featured: false,
    owner: { name: 'Sarah Phiri', phone: '+260944567890', verified: false }
  },
  {
    id: '5',
    title: 'Family Home in Avondale',
    price: 'K980,000',
    location: 'Avondale, Lusaka',
    type: 'buy',
    bedrooms: 3,
    bathrooms: 2,
    area: '220 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Peter Katongo', phone: '+260933123789', verified: true }
  },
  {
    id: '6',
    title: 'Duplex in Garden Compound',
    price: 'K650,000',
    location: 'Garden Compound, Lusaka',
    type: 'buy',
    bedrooms: 4,
    bathrooms: 2,
    area: '200 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Grace Mulenga', phone: '+260922456123', verified: true }
  }
];

export function BuyPage({ onNavigate }: BuyPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 3000000]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Buy Properties in Zambia</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Find your dream home with verified listings from trusted sellers. No commission fees.
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
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500k">K0 - K500,000</SelectItem>
                  <SelectItem value="500k-1m">K500,000 - K1,000,000</SelectItem>
                  <SelectItem value="1m-2m">K1,000,000 - K2,000,000</SelectItem>
                  <SelectItem value="2m+">K2,000,000+</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary hover:bg-primary/90">
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
                Properties for Sale ({buyProperties.length} listings)
              </h2>
              <p className="text-gray-600">Verified properties from trusted sellers</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lusaka">Lusaka</SelectItem>
                      <SelectItem value="ndola">Ndola</SelectItem>
                      <SelectItem value="kitwe">Kitwe</SelectItem>
                      <SelectItem value="livingstone">Livingstone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: K{priceRange[0].toLocaleString()} - K{priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={3000000}
                    step={50000}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Active filters:</span>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Verified Only</span>
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
            {buyProperties.map((property) => (
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