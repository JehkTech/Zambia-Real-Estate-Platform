import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Heart, 
  Home, 
  Camera, 
  CheckCircle,
  AlertCircle,
  Settings,
  CreditCard,
  Eye,
  Key,
  Upload
} from 'lucide-react';
import { PageType } from '../App';

interface AccountPageProps {
  onNavigate: (page: PageType) => void;
}

// Mock user data
const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Mwanza',
  email: 'john.mwanza@email.com',
  phone: '+260977123456',
  profileImage: '/api/placeholder/150/150',
  isVerified: true,
  memberSince: '2023',
  location: 'Lusaka, Zambia',
  bio: 'Property investor and landlord with 5+ years experience in Zambian real estate market.',
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    propertyAlerts: true
  },
  kyc: {
    nrcVerified: true,
    phoneVerified: true,
    emailVerified: true,
    addressVerified: false
  },
  stats: {
    propertiesListed: 12,
    propertiesSold: 8,
    totalViews: 15420,
    responseRate: 95
  }
};

const mockProperties = [
  {
    id: '1',
    title: '3-Bedroom House in Kabulonga',
    status: 'Active',
    views: 245,
    inquiries: 12,
    posted: '2024-01-15'
  },
  {
    id: '2',
    title: 'Modern Apartment in Rhodespark',
    status: 'Sold',
    views: 189,
    inquiries: 8,
    posted: '2023-12-08'
  }
];

export function AccountPage({ onNavigate }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="mb-4"
            >
              ← Back to Home
            </Button>
          </div>
          
          <Card className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={mockUser.profileImage} alt="Profile" />
                  <AvatarFallback className="text-xl">
                    {mockUser.firstName[0]}{mockUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {mockUser.firstName} {mockUser.lastName}
                  </h1>
                  {mockUser.isVerified && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{mockUser.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span>{mockUser.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{mockUser.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mt-2 max-w-2xl">{mockUser.bio}</p>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockUser.stats.responseRate}%</div>
                <div className="text-sm text-gray-600">Response Rate</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Properties Listed', value: mockUser.stats.propertiesListed, icon: Home },
            { label: 'Properties Sold', value: mockUser.stats.propertiesSold, icon: CheckCircle },
            { label: 'Total Views', value: mockUser.stats.totalViews.toLocaleString(), icon: Eye },
            { label: 'Member Since', value: mockUser.memberSince, icon: User }
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="verification">KYC</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      defaultValue={mockUser.firstName}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      defaultValue={mockUser.lastName}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      defaultValue={mockUser.email}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      defaultValue={mockUser.phone}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      defaultValue={mockUser.location}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      defaultValue={mockUser.bio}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex space-x-3">
                    <Button className="bg-primary">Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Properties</CardTitle>
                <Button 
                  className="bg-primary"
                  onClick={() => onNavigate('post-property')}
                >
                  Add New Property
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProperties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{property.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span>Posted: {property.posted}</span>
                          <span>{property.views} views</span>
                          <span>{property.inquiries} inquiries</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={property.status === 'Active' ? 'default' : 'secondary'}
                          className={property.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {property.status}
                        </Badge>
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Properties</CardTitle>
                <p className="text-gray-600">Properties you've bookmarked for later</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No saved properties yet</h3>
                  <p className="text-gray-600 mb-4">Start browsing properties and save your favorites</p>
                  <Button onClick={() => onNavigate('buy')}>Browse Properties</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KYC Verification Tab */}
          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>KYC Verification</CardTitle>
                <p className="text-gray-600">Verify your identity to build trust with other users</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: 'National Registration Card (NRC)', verified: mockUser.kyc.nrcVerified, required: true },
                  { label: 'Phone Number', verified: mockUser.kyc.phoneVerified, required: true },
                  { label: 'Email Address', verified: mockUser.kyc.emailVerified, required: true },
                  { label: 'Physical Address', verified: mockUser.kyc.addressVerified, required: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {item.verified ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        {item.required && !item.verified && (
                          <div className="text-sm text-red-600">Required for verification</div>
                        )}
                      </div>
                    </div>
                    {!item.verified && (
                      <Button variant="outline" size="sm">
                        Verify Now
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { id: 'email', label: 'Email Notifications', description: 'Receive updates via email', enabled: mockUser.preferences.emailNotifications },
                  { id: 'sms', label: 'SMS Notifications', description: 'Receive updates via SMS', enabled: mockUser.preferences.smsNotifications },
                  { id: 'marketing', label: 'Marketing Emails', description: 'Receive promotional offers', enabled: mockUser.preferences.marketingEmails },
                  { id: 'alerts', label: 'Property Alerts', description: 'Get notified about new properties', enabled: mockUser.preferences.propertyAlerts }
                ].map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{setting.label}</div>
                      <div className="text-sm text-gray-600">{setting.description}</div>
                    </div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Change Password</div>
                    <div className="text-sm text-gray-600">Update your account password</div>
                  </div>
                  <Button variant="outline">
                    <Key className="w-4 h-4 mr-2" />
                    Change
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-600">Add an extra layer of security</div>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: '2024-01-15', description: 'Featured Listing - 3BR House Kabulonga', amount: 'K150', status: 'Paid' },
                    { date: '2023-12-08', description: 'Basic Listing - Modern Apartment', amount: 'K50', status: 'Paid' },
                    { date: '2023-11-22', description: 'Transaction Fee - Property Sale', amount: 'K1,250', status: 'Paid' }
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-sm text-gray-600">{transaction.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{transaction.amount}</div>
                        <Badge className="bg-green-100 text-green-800">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}