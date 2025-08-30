import { useState } from 'react';
import { PropertyCard } from './PropertyCard';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';

// Mock property data
const properties = [
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
    title: 'Spacious 4-Bedroom House with Garden',
    price: 'K850,000',
    location: 'Rhodespark, Lusaka',
    type: 'buy',
    bedrooms: 4,
    bathrooms: 3,
    area: '250 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Mary Banda', phone: '+260966789012', verified: true }
  },
  {
    id: '3',
    title: 'Commercial Plot in City Center',
    price: 'K2,500,000',
    location: 'CBD, Lusaka',
    type: 'land',
    area: '1,500 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'David Ng\'oma', phone: '+260955345678', verified: true }
  },
  {
    id: '4',
    title: 'Cozy 2-Bedroom Flat in Woodlands',
    price: 'K2,200',
    location: 'Woodlands, Lusaka',
    type: 'rent',
    bedrooms: 2,
    bathrooms: 1,
    area: '85 sqm',
    image: '/api/placeholder/400/300',
    verified: false,
    featured: false,
    owner: { name: 'Sarah Phiri', phone: '+260944567890', verified: false }
  },
  {
    id: '5',
    title: 'Executive 5-Bedroom Villa',
    price: 'K1,200,000',
    location: 'Chalala, Lusaka',
    type: 'buy',
    bedrooms: 5,
    bathrooms: 4,
    area: '350 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: true,
    owner: { name: 'Peter Katongo', phone: '+260933123789', verified: true }
  },
  {
    id: '6',
    title: 'Office Space in Twin Palm Plaza',
    price: 'K4,500',
    location: 'Twin Palm, Lusaka',
    type: 'rent',
    area: '200 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Grace Mulenga', phone: '+260922456123', verified: true }
  }
];

export function PropertiesSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Properties</h2>
            <p className="text-gray-600">Discover verified properties from trusted owners</p>
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
            <Select defaultValue="newest">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
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
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
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
                  Price Range: K{priceRange[0]} - K{priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000}
                  step={1000}
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
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Lusaka</span>
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
          {properties.map((property) => (
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
  );
}