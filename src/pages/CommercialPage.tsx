import { useState } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Building, Factory, Store, MapPin, Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import { PageType } from '../App';

interface CommercialPageProps {
  onNavigate: (page: PageType) => void;
}

// Mock data for commercial properties
const commercialProperties = [
  {
    id: '1',
    title: 'Modern Office Space in CBD',
    price: 'K4,500/month',
    location: 'Cairo Road, Lusaka',
    type: 'rent' as const,
    bedrooms: 0,
    bathrooms: 2,
    area: '200 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: true,
    owner: { name: 'Business Properties Ltd', phone: '+260977123456', verified: true }
  },
  {
    id: '2',
    title: 'Retail Shop in Manda Hill',
    price: 'K8,500/month',
    location: 'Manda Hill, Lusaka',
    type: 'rent' as const,
    bedrooms: 0,
    bathrooms: 1,
    area: '150 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Manda Properties', phone: '+260966789012', verified: true }
  },
  {
    id: '3',
    title: 'Industrial Warehouse Complex',
    price: 'K12,000/month',
    location: 'Heavy Industrial Area, Lusaka',
    type: 'rent' as const,
    bedrooms: 0,
    bathrooms: 3,
    area: '2,000 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: true,
    owner: { name: 'Industrial Estates', phone: '+260955345678', verified: true }
  },
  {
    id: '4',
    title: 'Office Building for Sale',
    price: 'K2,500,000',
    location: 'Independence Avenue, Lusaka',
    type: 'buy' as const,
    bedrooms: 0,
    bathrooms: 8,
    area: '800 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Commercial Investments', phone: '+260944567890', verified: true }
  },
  {
    id: '5',
    title: 'Restaurant Space Available',
    price: 'K6,200/month',
    location: 'East Park Mall, Lusaka',
    type: 'rent' as const,
    bedrooms: 0,
    bathrooms: 2,
    area: '180 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    owner: { name: 'Mall Management', phone: '+260933123789', verified: true }
  },
  {
    id: '6',
    title: 'Manufacturing Facility',
    price: 'K15,000/month',
    location: 'Chilanga Industrial Park',
    type: 'rent' as const,
    bedrooms: 0,
    bathrooms: 4,
    area: '3,500 sqm',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: true,
    owner: { name: 'Industrial Parks Zambia', phone: '+260922456123', verified: true }
  }
];

export function CommercialPage({ onNavigate }: CommercialPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Commercial Properties in Zambia</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find the perfect space for your business. From offices to warehouses, discover verified commercial properties.
            </p>
          </div>

          {/* Property Types */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Building, label: 'Offices', count: '250+' },
              { icon: Store, label: 'Retail', count: '180+' },
              { icon: Factory, label: 'Industrial', count: '95+' },
              { icon: Building, label: 'Mixed Use', count: '120+' },
            ].map((type, index) => (
              <Card key={index} className="p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                <type.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-semibold text-gray-900">{type.label}</div>
                <div className="text-sm text-gray-600">{type.count} properties</div>
              </Card>
            ))}
          </div>

          {/* Quick Search */}
          <Card className="p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Location (CBD, Manda Hill, Industrial Area...)"
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office Space</SelectItem>
                  <SelectItem value="retail">Retail Shop</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="mixed">Mixed Use</SelectItem>
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
                Commercial Properties ({commercialProperties.length} listings)
              </h2>
              <p className="text-gray-600">Professional spaces for your business needs</p>
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
                  <SelectItem value="area">By Area</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
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
                      <SelectItem value="office">Office Space</SelectItem>
                      <SelectItem value="retail">Retail Shop</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area Size</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">0-100 sqm</SelectItem>
                      <SelectItem value="medium">100-500 sqm</SelectItem>
                      <SelectItem value="large">500-1000 sqm</SelectItem>
                      <SelectItem value="xlarge">1000+ sqm</SelectItem>
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
                      <SelectItem value="cbd">CBD</SelectItem>
                      <SelectItem value="industrial">Industrial Area</SelectItem>
                      <SelectItem value="malls">Shopping Malls</SelectItem>
                      <SelectItem value="residential">Residential Areas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget: K{priceRange[0]} - K{priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={20000}
                    step={500}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Active filters:</span>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Business Ready</span>
                  <button className="ml-1 text-xs">×</button>
                </Badge>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Parking Available</span>
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
            {commercialProperties.map((property) => (
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

      {/* Business Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Business Services
            </h2>
            <p className="text-xl text-gray-600">
              Additional services to help your business succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Property Management',
                description: 'Full property management services for commercial landlords',
                features: ['Tenant screening', 'Rent collection', 'Maintenance coordination', 'Financial reporting'],
                price: 'From 8% of rent'
              },
              {
                title: 'Business Setup',
                description: 'Complete business registration and compliance services',
                features: ['Company registration', 'License applications', 'Tax registration', 'Legal compliance'],
                price: 'From K2,500'
              },
              {
                title: 'Market Research',
                description: 'Detailed market analysis for business locations',
                features: ['Demographic analysis', 'Competition mapping', 'Foot traffic data', 'Growth projections'],
                price: 'From K1,200'
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-1 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-primary font-semibold mb-4">{service.price}</div>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}