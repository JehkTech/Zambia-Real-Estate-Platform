import { useState } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Filter, Grid, List, SlidersHorizontal, Search, MapPin, GraduationCap, Users, Wifi, Car } from 'lucide-react';
import { PageType } from '../App';

interface BoardingPageProps {
  onNavigate: (page: PageType) => void;
}

// Mock data for boarding houses with student-specific features
const boardingHouses = [
  {
    id: '1',
    title: 'Modern Student Lodge - UNZA Campus',
    price: 'K350',
    priceType: 'per bedspace/month',
    location: 'Great East Road, near UNZA',
    type: 'boarding',
    bedspaces: 4,
    availableBedspaces: 2,
    bathrooms: 2,
    area: '12 sqm per room',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: true,
    distanceFromUni: '0.5km from UNZA',
    amenities: ['Free WiFi', 'Study Room', 'Security', 'Laundry'],
    academicYear: '2024/2025',
    owner: { name: 'Student Housing Ltd', phone: '+260977123456', verified: true }
  },
  {
    id: '2',
    title: 'Affordable Boarding House - CBU Area',
    price: 'K280',
    priceType: 'per bedspace/month',
    location: 'Riverside, near CBU',
    type: 'boarding',
    bedspaces: 6,
    availableBedspaces: 3,
    bathrooms: 3,
    area: '10 sqm per room',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    distanceFromUni: '1.2km from CBU',
    amenities: ['WiFi', 'Kitchen', 'Security Guard', 'Parking'],
    academicYear: '2024/2025',
    owner: { name: 'Mary Mwanza', phone: '+260966789012', verified: true }
  },
  {
    id: '3',
    title: 'Premium Student Residence - Mulungushi',
    price: 'K450',
    priceType: 'per bedspace/month',
    location: 'Kabwe, near Mulungushi University',
    type: 'boarding',
    bedspaces: 8,
    availableBedspaces: 1,
    bathrooms: 4,
    area: '15 sqm per room',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: true,
    distanceFromUni: '0.3km from Mulungushi',
    amenities: ['High-Speed WiFi', 'Library', 'Gym', 'Dining Hall', '24/7 Security'],
    academicYear: '2024/2025',
    owner: { name: 'University Hostels Zambia', phone: '+260955345678', verified: true }
  },
  {
    id: '4',
    title: 'Budget Boarding - Levy Mwanawasa Campus',
    price: 'K220',
    priceType: 'per bedspace/month',
    location: 'Ndola, near Levy Campus',
    type: 'boarding',
    bedspaces: 4,
    availableBedspaces: 4,
    bathrooms: 2,
    area: '8 sqm per room',
    image: '/api/placeholder/400/300',
    verified: false,
    featured: false,
    distanceFromUni: '0.8km from Levy Campus',
    amenities: ['Basic WiFi', 'Common Kitchen', 'Study Area'],
    academicYear: '2024/2025',
    owner: { name: 'James Phiri', phone: '+260944567890', verified: false }
  },
  {
    id: '5',
    title: 'All-Female Boarding House - UNZA',
    price: 'K320',
    priceType: 'per bedspace/month',
    location: 'Roma, near UNZA',
    type: 'boarding',
    bedspaces: 6,
    availableBedspaces: 2,
    bathrooms: 3,
    area: '11 sqm per room',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    distanceFromUni: '0.7km from UNZA',
    amenities: ['WiFi', 'Female Only', 'Security', 'Common Room', 'Laundry'],
    academicYear: '2024/2025',
    owner: { name: 'Grace Katongo', phone: '+260933123789', verified: true }
  },
  {
    id: '6',
    title: 'Co-ed Student Lodge - Cavendish',
    price: 'K380',
    priceType: 'per bedspace/month',
    location: 'Cavendish, near Cavendish University',
    type: 'boarding',
    bedspaces: 10,
    availableBedspaces: 5,
    bathrooms: 5,
    area: '13 sqm per room',
    image: '/api/placeholder/400/300',
    verified: true,
    featured: false,
    distanceFromUni: '0.2km from Cavendish',
    amenities: ['Free WiFi', 'Study Rooms', 'Recreation Area', 'Security', 'Meal Plan Available'],
    academicYear: '2024/2025',
    owner: { name: 'Student Accommodation Services', phone: '+260922456123', verified: true }
  }
];

export function BoardingPage({ onNavigate }: BoardingPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="w-12 h-12 mr-3" />
              <h1 className="text-4xl font-bold">Student Boarding Houses</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Find affordable student accommodation near universities. Direct booking with verified landlords.
            </p>
          </div>

          {/* Quick Search */}
          <Card className="p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="University or Area (UNZA, CBU, Mulungushi...)"
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Budget per bedspace" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-250">K0 - K250</SelectItem>
                  <SelectItem value="250-350">K250 - K350</SelectItem>
                  <SelectItem value="350-450">K350 - K450</SelectItem>
                  <SelectItem value="450+">K450+</SelectItem>
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
                Student Boarding Houses ({boardingHouses.length} listings)
              </h2>
              <p className="text-gray-600">Verified student accommodation with flexible payment options</p>
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
                  <SelectItem value="distance">Distance from Uni</SelectItem>
                  <SelectItem value="availability">Most Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Universities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unza">UNZA</SelectItem>
                      <SelectItem value="cbu">CBU</SelectItem>
                      <SelectItem value="mulungushi">Mulungushi University</SelectItem>
                      <SelectItem value="cavendish">Cavendish University</SelectItem>
                      <SelectItem value="levy">Levy Mwanawasa Campus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedspaces</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-4">2-4 Bedspaces</SelectItem>
                      <SelectItem value="4-6">4-6 Bedspaces</SelectItem>
                      <SelectItem value="6-8">6-8 Bedspaces</SelectItem>
                      <SelectItem value="8+">8+ Bedspaces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mixed">Co-ed</SelectItem>
                      <SelectItem value="female">Female Only</SelectItem>
                      <SelectItem value="male">Male Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-0.5">Within 0.5km</SelectItem>
                      <SelectItem value="0.5-1">0.5km - 1km</SelectItem>
                      <SelectItem value="1-2">1km - 2km</SelectItem>
                      <SelectItem value="2+">2km+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Amenities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wifi">Free WiFi</SelectItem>
                      <SelectItem value="study">Study Room</SelectItem>
                      <SelectItem value="security">24/7 Security</SelectItem>
                      <SelectItem value="parking">Parking</SelectItem>
                      <SelectItem value="laundry">Laundry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per bedspace: K{priceRange[0]} - K{priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    step={20}
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
                  <span>Near UNZA</span>
                  <button className="ml-1 text-xs">×</button>
                </Badge>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Free WiFi</span>
                  <button className="ml-1 text-xs">×</button>
                </Badge>
              </div>
            </Card>
          )}

          {/* Special Info Banner */}
          <Card className="p-4 mb-8 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Student-Friendly Features</h3>
                <p className="text-blue-800 text-sm mt-1">
                  All listings include flexible payment terms, study areas, and are verified for student safety. 
                  Most offer semester-based contracts and group booking discounts.
                </p>
              </div>
            </div>
          </Card>

          {/* Properties Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {boardingHouses.map((property) => (
              <div key={property.id} className="relative">
                <PropertyCard property={property} />
                {/* Student-specific overlay */}
                <div className="absolute top-2 right-2 flex flex-col space-y-1">
                  <Badge className="bg-blue-600 text-white text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {property.availableBedspaces}/{property.bedspaces} available
                  </Badge>
                  <Badge variant="outline" className="bg-white text-xs">
                    {property.distanceFromUni}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8"
            >
              Load More Boarding Houses
            </Button>
          </div>

          {/* Student Resources */}
          <Card className="mt-12 p-6 bg-gray-50">
            <h3 className="text-xl font-semibold mb-4">Student Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">University Guide</h4>
                <p className="text-sm text-gray-600">Find accommodation near your university with distance calculations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Roommate Matching</h4>
                <p className="text-sm text-gray-600">Connect with other students looking for shared accommodation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Wifi className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Student Essentials</h4>
                <p className="text-sm text-gray-600">All properties verified for WiFi, security, and study environments</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}