import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Upload, MapPin, Home, DollarSign, Camera, FileText, CheckCircle } from 'lucide-react';
import { PageType } from '../App';

interface PostPropertyPageProps {
  onNavigate: (page: PageType) => void;
}

export function PostPropertyPage({ onNavigate }: PostPropertyPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyType, setPropertyType] = useState('');
  const [listingType, setListingType] = useState('');

  const steps = [
    { id: 1, title: 'Property Type', icon: Home },
    { id: 2, title: 'Location', icon: MapPin },
    { id: 3, title: 'Details', icon: FileText },
    { id: 4, title: 'Pricing', icon: DollarSign },
    { id: 5, title: 'Photos', icon: Camera },
    { id: 6, title: 'Review', icon: CheckCircle },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>What type of property are you listing?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Listing Type</Label>
                <RadioGroup value={listingType} onValueChange={setListingType} className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="rent" id="rent" />
                    <Label htmlFor="rent" className="flex-1 cursor-pointer">
                      <div className="font-medium">For Rent</div>
                      <div className="text-sm text-gray-600">Monthly rental income</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="sale" id="sale" />
                    <Label htmlFor="sale" className="flex-1 cursor-pointer">
                      <div className="font-medium">For Sale</div>
                      <div className="text-sm text-gray-600">Sell your property</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Property Type</Label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: 'apartment', label: 'Apartment', desc: 'Flat in building' },
                    { id: 'house', label: 'House', desc: 'Independent house' },
                    { id: 'townhouse', label: 'Townhouse', desc: 'Row house' },
                    { id: 'villa', label: 'Villa', desc: 'Luxury house' },
                    { id: 'plot', label: 'Plot/Land', desc: 'Empty land' },
                    { id: 'office', label: 'Office', desc: 'Commercial office' },
                    { id: 'shop', label: 'Shop/Retail', desc: 'Retail space' },
                    { id: 'warehouse', label: 'Warehouse', desc: 'Storage facility' },
                  ].map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setPropertyType(type.id)}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                        propertyType === type.id ? 'border-primary bg-primary/5' : ''
                      }`}
                    >
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-gray-600">{type.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Where is your property located?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="province">Province *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lusaka">Lusaka Province</SelectItem>
                      <SelectItem value="copperbelt">Copperbelt Province</SelectItem>
                      <SelectItem value="southern">Southern Province</SelectItem>
                      <SelectItem value="eastern">Eastern Province</SelectItem>
                      <SelectItem value="western">Western Province</SelectItem>
                      <SelectItem value="northwestern">Northwestern Province</SelectItem>
                      <SelectItem value="northern">Northern Province</SelectItem>
                      <SelectItem value="muchinga">Muchinga Province</SelectItem>
                      <SelectItem value="central">Central Province</SelectItem>
                      <SelectItem value="luapula">Luapula Province</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="district">District *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lusaka">Lusaka</SelectItem>
                      <SelectItem value="ndola">Ndola</SelectItem>
                      <SelectItem value="kitwe">Kitwe</SelectItem>
                      <SelectItem value="livingstone">Livingstone</SelectItem>
                      <SelectItem value="chipata">Chipata</SelectItem>
                      <SelectItem value="kabwe">Kabwe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">Area/Suburb *</Label>
                  <Input id="area" placeholder="e.g. Kabulonga, Rhodespark, Woodlands" />
                </div>

                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" placeholder="Street name and number" />
                </div>
              </div>

              <div>
                <Label htmlFor="description-location">Property Description</Label>
                <Textarea 
                  id="description-location"
                  placeholder="Describe the location, nearby landmarks, accessibility..."
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Nearby Amenities (Select all that apply)</Label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    'Shopping Mall', 'Hospital/Clinic', 'School', 'University',
                    'Bank', 'Police Station', 'Public Transport', 'Market',
                    'Restaurant', 'Fuel Station', 'Church', 'Mosque'
                  ].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {propertyType !== 'plot' && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="parking">Parking Spaces</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="floors">Number of Floors</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="built-area">Built-up Area (sqm) *</Label>
                  <Input id="built-area" type="number" placeholder="e.g. 120" />
                </div>

                <div>
                  <Label htmlFor="plot-area">Plot Area (sqm)</Label>
                  <Input id="plot-area" type="number" placeholder="e.g. 400" />
                </div>

                <div>
                  <Label htmlFor="age">Property Age</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Construction</SelectItem>
                      <SelectItem value="1-5">1-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-20">11-20 years</SelectItem>
                      <SelectItem value="20+">20+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tenure">Land Tenure</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freehold">Freehold</SelectItem>
                      <SelectItem value="leasehold">Leasehold</SelectItem>
                      <SelectItem value="customary">Customary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Property Features</Label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'Air Conditioning', 'Swimming Pool', 'Garden', 'Balcony',
                    'Terrace', 'Servant Quarters', 'Generator', 'Borehole',
                    'Solar Panels', 'CCTV', 'Electric Fence', 'Security Guard',
                    'Furnished', 'Semi-Furnished', 'Fireplace', 'Study Room'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox id={feature} />
                      <Label htmlFor={feature} className="text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Utilities Available</Label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    'Electricity (ZESCO)', 'Water (Council)', 'Borehole Water', 'Internet Ready',
                    'Landline Phone', 'Sewerage', 'Garbage Collection', 'Street Lighting'
                  ].map((utility) => (
                    <div key={utility} className="flex items-center space-x-2">
                      <Checkbox id={utility} />
                      <Label htmlFor={utility} className="text-sm">{utility}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price">
                    {listingType === 'rent' ? 'Monthly Rent (Kwacha) *' : 'Sale Price (Kwacha) *'}
                  </Label>
                  <Input id="price" type="number" placeholder="e.g. 3500" />
                </div>

                {listingType === 'rent' && (
                  <div>
                    <Label htmlFor="deposit">Security Deposit (Kwacha)</Label>
                    <Input id="deposit" type="number" placeholder="e.g. 7000" />
                  </div>
                )}

                <div>
                  <Label htmlFor="currency">Preferred Currency</Label>
                  <Select defaultValue="zmw">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zmw">Zambian Kwacha (ZMW)</SelectItem>
                      <SelectItem value="usd">US Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="negotiable">Price Negotiation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Price</SelectItem>
                      <SelectItem value="negotiable">Negotiable</SelectItem>
                      <SelectItem value="slightly">Slightly Negotiable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {listingType === 'rent' && (
                <div>
                  <Label className="text-base font-medium mb-4 block">Rental Terms</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lease-period">Minimum Lease Period</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6-months">6 Months</SelectItem>
                          <SelectItem value="1-year">1 Year</SelectItem>
                          <SelectItem value="2-years">2 Years</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="payment-terms">Payment Terms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Listing Fees */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">PropertyZM Listing Fees</h4>
                  <div className="space-y-2 text-sm text-yellow-700">
                    <div className="flex justify-between">
                      <span>Basic Listing (30 days):</span>
                      <span className="font-medium">K50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Featured Listing (30 days):</span>
                      <span className="font-medium">K150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Premium Listing (30 days):</span>
                      <span className="font-medium">K300</span>
                    </div>
                    {listingType === 'sale' && (
                      <div className="border-t border-yellow-300 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span>Transaction Fee (on successful sale):</span>
                          <span className="font-medium">2.5%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Property Photos</CardTitle>
              <p className="text-gray-600">Upload high-quality photos of your property (Max 20 photos)</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Photos</h3>
                <p className="text-gray-600 mb-4">Drag and drop photos here or click to browse</p>
                <Button variant="outline">Choose Files</Button>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: JPG, PNG, WEBP (Max 5MB each)
                </p>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Photo Guidelines</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Essential Photos:</h4>
                    <ul className="space-y-1">
                      <li>• Front exterior view</li>
                      <li>• Living room</li>
                      <li>• All bedrooms</li>
                      <li>• Kitchen</li>
                      <li>• Bathrooms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Additional Photos:</h4>
                    <ul className="space-y-1">
                      <li>• Garden/yard</li>
                      <li>• Parking area</li>
                      <li>• Security features</li>
                      <li>• Neighborhood view</li>
                      <li>• Special features</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <p className="text-gray-600">Please review all information before submitting</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Property Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div>Type: <span className="font-medium">3-Bedroom House</span></div>
                    <div>Location: <span className="font-medium">Kabulonga, Lusaka</span></div>
                    <div>Price: <span className="font-medium">K3,500/month</span></div>
                    <div>Area: <span className="font-medium">120 sqm</span></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Listing Package</h4>
                  <div className="space-y-2 text-sm">
                    <div>Package: <span className="font-medium">Featured Listing</span></div>
                    <div>Duration: <span className="font-medium">30 days</span></div>
                    <div>Cost: <span className="font-medium">K150</span></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="verification" />
                  <Label htmlFor="verification" className="text-sm">
                    I certify that I am the owner or authorized agent of this property
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="accuracy" />
                  <Label htmlFor="accuracy" className="text-sm">
                    I confirm that all information provided is accurate and up-to-date
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Your Property</h1>
          <p className="text-xl text-gray-600">
            List your property and connect with verified buyers or tenants
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep === steps.length ? (
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                // Handle form submission
                alert('Property listing submitted successfully!');
                onNavigate('home');
              }}
            >
              Submit Listing
            </Button>
          ) : (
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              disabled={currentStep === 1 && (!propertyType || !listingType)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}