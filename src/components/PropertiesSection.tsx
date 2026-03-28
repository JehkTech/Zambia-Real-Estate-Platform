import { useState } from 'react';
import { PropertyCard } from './PropertyCard';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Grid, List, SlidersHorizontal, ArrowRight } from 'lucide-react';

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
    image: 'https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzczNzEwMzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    featured: true,
    owner: { name: 'John Mwanza', phone: '+260977123456', verified: true },
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
    image: 'https://images.unsplash.com/photo-1679364297777-1db77b6199be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yJTIwZ2FyZGVufGVufDF8fHx8MTc3Mzc0MDU1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    featured: false,
    owner: { name: 'Mary Banda', phone: '+260966789012', verified: true },
  },
  {
    id: '3',
    title: 'Commercial Plot in City Center',
    price: 'K2,500,000',
    location: 'CBD, Lusaka',
    type: 'land',
    area: '1,500 sqm',
    image: 'https://images.unsplash.com/photo-1763046472163-32c74523903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzczNjg4NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    featured: false,
    owner: { name: "David Ng'oma", phone: '+260955345678', verified: true },
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
    image: 'https://images.unsplash.com/photo-1597497522150-2f50bffea452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwYXBhcnRtZW50fGVufDF8fHx8MTc3Mzc0MDU2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: false,
    featured: false,
    owner: { name: 'Sarah Phiri', phone: '+260944567890', verified: false },
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
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZnJpY2FuJTIwaG9tZSUyMGx1eHVyeXxlbnwxfHx8fDE3NzM3NDA1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    featured: true,
    owner: { name: 'Peter Katongo', phone: '+260933123789', verified: true },
  },
  {
    id: '6',
    title: 'Office Space in Twin Palm Plaza',
    price: 'K4,500',
    location: 'Twin Palm, Lusaka',
    type: 'rent',
    area: '200 sqm',
    image: 'https://images.unsplash.com/photo-1770386751962-d3bb928aeb7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwYXBhcnRtZW50JTIwY29tcGxleHxlbnwxfHx8fDE3NzM3NDA1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    verified: true,
    featured: false,
    owner: { name: 'Grace Mulenga', phone: '+260922456123', verified: true },
  },
];

export function PropertiesSection() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [activeTab, setActiveTab] = useState('all');

  const filteredProperties = activeTab === 'all' ? properties : properties.filter((p) => p.type === activeTab);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-[#52a447] uppercase tracking-wider">Latest Listings</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Featured Properties</h2>
            <p className="text-gray-600 mt-2">Hand-picked verified properties from trusted owners</p>
          </div>

          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            {/* Property type tabs */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100">
              {[
                { id: 'all', label: 'All' },
                { id: 'rent', label: 'Rent' },
                { id: 'buy', label: 'Buy' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-md text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#52a447] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex bg-white rounded-lg p-1 shadow-sm border border-gray-100">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-[#52a447] hover:bg-[#52a447]/90' : ''}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-[#52a447] hover:bg-[#52a447]/90' : ''}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Filters Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>

            {/* Sort */}
            <Select defaultValue="newest">
              <SelectTrigger className="w-36 hidden sm:flex">
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
          <Card className="p-6 mb-8 border border-gray-100">
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
                  Price Range: K{priceRange[0].toLocaleString()} - K{priceRange[1].toLocaleString()}
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
            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Active filters:</span>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Verified Only</span>
                <button className="ml-1 text-xs">&times;</button>
              </Badge>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Lusaka</span>
                <button className="ml-1 text-xs">&times;</button>
              </Badge>
            </div>
          </Card>
        )}

        {/* Properties Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          }`}
        >
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 border-[#52a447] text-[#52a447] hover:bg-[#52a447] hover:text-white">
            View All Properties <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
