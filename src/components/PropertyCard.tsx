import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, MapPin, Bed, Bath, Square, Phone, MessageCircle, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: string;
    priceType?: string; // For boarding houses: "per bedspace/month"
    location: string;
    type: string;
    bedrooms?: number;
    bathrooms?: number;
    bedspaces?: number; // For boarding houses
    availableBedspaces?: number; // For boarding houses
    distanceFromUni?: string; // For boarding houses
    amenities?: string[]; // For boarding houses
    area: string;
    image: string;
    verified: boolean;
    featured: boolean;
    owner: {
      name: string;
      phone: string;
      verified: boolean;
    };
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
      <div className="relative">
        <ImageWithFallback
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {property.featured && (
            <Badge 
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Featured
            </Badge>
          )}
          {property.verified && (
            <Badge 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Verified
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </Button>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 rounded-lg px-3 py-1">
            <span className="text-lg font-bold text-primary">{property.price}</span>
            <span className="text-sm text-gray-600 ml-1">
              {property.priceType || (property.type === 'rent' ? '/month' : '')}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title & Location */}
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {property.bedrooms && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.bedspaces && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedspaces}</span>
              </div>
            )}
            {property.availableBedspaces && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4" />
                <span>{property.availableBedspaces}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Square className="w-4 h-4" />
              <span>{property.area}</span>
            </div>
          </div>

          {/* Owner Info */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {property.owner.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {property.owner.name}
                  {property.owner.verified && (
                    <span className="ml-1 text-green-600">✓</span>
                  )}
                </div>
                <div className="text-xs text-gray-600">Property Owner</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
              style={{ backgroundColor: '#007786' }}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Message
            </Button>
            <Button variant="ghost" size="sm" className="px-3">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}