import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { PageType } from '../App';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* App Download Banner */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white">Get the PropertyZM App</h3>
              <p className="text-gray-400 text-sm mt-1">Search properties on the go. Get instant notifications for new listings.</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-white text-gray-900 rounded-lg px-5 py-2.5 flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.9236 8.2179L19.3338 5.90902C19.4632 5.6979 19.3924 5.42457 19.1778 5.29316C18.9632 5.16175 18.6853 5.23381 18.5558 5.44493L17.1217 7.79394C15.5423 7.07923 13.8206 6.69341 12.0001 6.69341C10.1796 6.69341 8.45785 7.07923 6.87845 7.79394L5.44438 5.44493C5.31489 5.23381 5.03695 5.16175 4.82236 5.29316C4.60777 5.42457 4.53693 5.6979 4.66642 5.90902L6.07667 8.2179C2.76062 10.1664 0.521484 13.5831 0.521484 17.4609H23.4787C23.4787 13.5831 21.2395 10.1664 17.9236 8.2179ZM6.88888 14.3415C6.30294 14.3415 5.82857 13.8671 5.82857 13.2812C5.82857 12.6953 6.30294 12.2209 6.88888 12.2209C7.47483 12.2209 7.9492 12.6953 7.9492 13.2812C7.9492 13.8671 7.47483 14.3415 6.88888 14.3415ZM17.1113 14.3415C16.5254 14.3415 16.051 13.8671 16.051 13.2812C16.051 12.6953 16.5254 12.2209 17.1113 12.2209C17.6972 12.2209 18.1716 12.6953 18.1716 13.2812C18.1716 13.8671 17.6972 14.3415 17.1113 14.3415Z" /></svg>
                <div className="text-left">
                  <div className="text-[9px] leading-none">GET IT ON</div>
                  <div className="text-sm font-semibold leading-none mt-0.5">Google Play</div>
                </div>
              </button>
              <button className="bg-white text-gray-900 rounded-lg px-5 py-2.5 flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" /></svg>
                <div className="text-left">
                  <div className="text-[9px] leading-none">Download on the</div>
                  <div className="text-sm font-semibold leading-none mt-0.5">App Store</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#52a447' }}>
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-none">PropertyZM</h3>
                <span className="text-[9px] text-[#52a447] font-semibold uppercase tracking-wider">Zambia's #1</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Zambia's most trusted property platform. Connecting owners directly with tenants and buyers since 2023.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#52a447]" />
                <span className="text-sm">Plot 123, Great East Road, Lusaka</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#52a447]" />
                <span className="text-sm">+260 211 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#52a447]" />
                <span className="text-sm">info@propertyzm.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
            <nav className="space-y-2.5">
              {[
                { label: 'Buy Properties', page: 'buy' as PageType },
                { label: 'Rent Properties', page: 'rent' as PageType },
                { label: 'Student Boarding', page: 'boarding' as PageType },
                { label: 'Post Property', page: 'post-property' as PageType },
                { label: 'Commercial', page: 'commercial' as PageType },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.page)}
                  className="block text-sm hover:text-[#52a447] transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <a href="#" className="block text-sm hover:text-[#52a447] transition-colors">Property Valuation</a>
              <a href="#" className="block text-sm hover:text-[#52a447] transition-colors">Market Insights</a>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h4>
            <nav className="space-y-2.5">
              <a href="#" className="block text-sm hover:text-[#52a447] transition-colors">Help Center</a>
              <a href="#" className="block text-sm hover:text-[#52a447] transition-colors">Contact Us</a>
              <a href="#" className="block text-sm hover:text-[#52a447] transition-colors">Report Property</a>
              <a href="#" className="block text-sm hover:text-[#52a447] transition-colors">Safety Tips</a>
              <a href="#" className="block text-sm hover:text-[#52a447] transition-colors">Terms of Service</a>
              <a href="#" className="block text-sm hover:text-[#52a447] transition-colors">Privacy Policy</a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Updated</h4>
            <p className="text-gray-400 text-sm">
              Get the latest listings and market insights delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
              <Button
                className="w-full"
                style={{ backgroundColor: '#52a447' }}
              >
                Subscribe <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Button key={i} variant="ghost" size="sm" className="text-gray-400 hover:text-[#52a447] hover:bg-gray-800 w-9 h-9 p-0">
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#52a447]" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#52a447]" />
              <span>KYC Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#52a447]" />
              <span>ZICTA Registered</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#52a447]" />
              <span>PACRA Certified</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500">
            &copy; 2026 PropertyZM. All rights reserved. Made with care in Zambia.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-[#52a447] transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-[#52a447] transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-[#52a447] transition-colors">Cookies</a>
            <a href="#" className="text-gray-500 hover:text-[#52a447] transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
