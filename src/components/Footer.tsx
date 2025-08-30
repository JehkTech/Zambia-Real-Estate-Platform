import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { PageType } from '../App';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#52a447' }}>
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h3 className="text-xl font-bold text-white">PropertyZM</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Zambia's trusted platform for property transactions. 
              Connecting property owners directly with tenants and buyers.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Plot 123, Great East Road, Lusaka</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+260 211 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">info@propertyzm.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-2">
              <button 
                onClick={() => onNavigate('buy')}
                className="block hover:text-primary transition-colors text-left"
              >
                Buy Properties
              </button>
              <button 
                onClick={() => onNavigate('rent')}
                className="block hover:text-primary transition-colors text-left"
              >
                Rent Properties
              </button>
              <button 
                onClick={() => onNavigate('post-property')}
                className="block hover:text-primary transition-colors text-left"
              >
                Post Property
              </button>
              <button 
                onClick={() => onNavigate('commercial')}
                className="block hover:text-primary transition-colors text-left"
              >
                Commercial
              </button>
              <a href="#" className="block hover:text-primary transition-colors">Property Valuation</a>
              <a href="#" className="block hover:text-primary transition-colors">Market Insights</a>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <nav className="space-y-2">
              <a href="#" className="block hover:text-primary transition-colors">Help Center</a>
              <a href="#" className="block hover:text-primary transition-colors">Contact Us</a>
              <a href="#" className="block hover:text-primary transition-colors">Report Property</a>
              <a href="#" className="block hover:text-primary transition-colors">Safety Tips</a>
              <a href="#" className="block hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="block hover:text-primary transition-colors">Privacy Policy</a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-gray-400 text-sm">
              Get the latest property listings and market insights delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button 
                className="w-full"
                style={{ backgroundColor: '#52a447' }}
              >
                Subscribe
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3 pt-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © 2024 PropertyZM. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookies</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}