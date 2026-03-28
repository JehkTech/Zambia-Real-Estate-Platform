import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, MapPin, Bed, Bath, Square, Phone, MessageCircle, Eye, Clock, Flame } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: string;
    priceType?: string;
    location: string;
    type: string;
    bedrooms?: number;
    bathrooms?: number;
    bedspaces?: number;
    availableBedspaces?: number;
    distanceFromUni?: string;
    amenities?: string[];
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
  const [isFavorited, setIsFavorited] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  // Simulated engagement data
  const viewCount = Math.floor(Math.random() * 200 + 50);
  const daysAgo = Math.floor(Math.random() * 7 + 1);
  const isHot = viewCount > 180;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 group">
      <div className="relative">
        <ImageWithFallback
          src={property.image}
          alt={property.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top overlay gradient */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5">
          {property.featured && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-md">
              Featured
            </Badge>
          )}
          {property.verified && (
            <Badge className="bg-[#52a447] hover:bg-[#52a447]/90 text-white shadow-md">
              Verified
            </Badge>
          )}
          {isHot && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-md">
              <Flame className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full shadow-md transition-all ${
            isFavorited ? 'bg-red-500 hover:bg-red-600' : 'bg-white/90 hover:bg-white'
          }`}
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'text-white fill-white' : 'text-gray-600'}`} />
        </Button>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
            <span className="text-lg font-bold text-[#52a447]">{property.price}</span>
            <span className="text-sm text-gray-600 ml-1">
              {property.priceType || (property.type === 'rent' ? '/month' : '')}
            </span>
          </div>
        </div>

        {/* View count */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-black/60 backdrop-blur-sm text-white rounded-full px-2.5 py-1 flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span className="text-xs">{viewCount}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title & Location */}
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#52a447] transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center justify-between mt-1.5">
              <div className="flex items-center text-gray-500">
                <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span className="text-sm">{property.location}</span>
              </div>
              <div className="flex items-center text-gray-400 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {daysAgo}d ago
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {property.bedrooms !== undefined && property.bedrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4 text-gray-400" />
                <span>{property.bedrooms} Bed</span>
              </div>
            )}
            {property.bathrooms !== undefined && property.bathrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4 text-gray-400" />
                <span>{property.bathrooms} Bath</span>
              </div>
            )}
            {property.bedspaces && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4 text-gray-400" />
                <span>{property.bedspaces} Spaces</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Square className="w-4 h-4 text-gray-400" />
              <span>{property.area}</span>
            </div>
          </div>

          {/* Owner Info */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                style={{ backgroundColor: property.owner.verified ? '#52a447' : '#9ca3af' }}
              >
                {property.owner.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 flex items-center">
                  {property.owner.name}
                  {property.owner.verified && (
                    <span className="ml-1 text-[#52a447] text-xs">&#10003;</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">Property Owner</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-[#52a447] text-[#52a447] hover:bg-[#52a447] hover:text-white transition-all"
              onClick={() => setShowPhone(!showPhone)}
            >
              <Phone className="w-4 h-4 mr-1" />
              {showPhone ? property.owner.phone.slice(-6) : 'Call'}
            </Button>
            <Button
              size="sm"
              className="flex-1 text-white"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
            <Button variant="ghost" size="sm" className="px-3 text-gray-500 hover:text-[#007786]">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
