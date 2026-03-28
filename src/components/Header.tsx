import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Menu, User, Bell, Heart, X, Plus, ChevronDown } from 'lucide-react';
import { PageType } from '../App';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navigationItems = [
    { id: 'buy' as PageType, label: 'Buy' },
    { id: 'rent' as PageType, label: 'Rent' },
    { id: 'boarding' as PageType, label: 'Student Boarding' },
    { id: 'sell' as PageType, label: 'Sell' },
    { id: 'commercial' as PageType, label: 'Commercial' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
            onClick={() => onNavigate('home')}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center relative" style={{ backgroundColor: '#52a447' }}>
              <div className="w-4 h-4 bg-white rounded-sm" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#007786] rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900 leading-none">PropertyZM</h1>
              <span className="text-[9px] text-[#007786] font-semibold tracking-wider uppercase leading-none mt-0.5">Zambia's #1</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg transition-all text-sm ${
                  currentPage === item.id
                    ? 'text-[#52a447] bg-[#52a447]/5 font-semibold'
                    : 'text-gray-700 hover:text-[#52a447] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden xl:flex flex-1 max-w-md mx-6">
            <div className={`relative w-full transition-all ${isSearchFocused ? 'scale-105' : ''}`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search location, project, or landmark"
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-[#52a447]"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">Saved</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex relative text-gray-600 hover:text-[#52a447]"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-semibold">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <ChevronDown className="w-3 h-3 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => onNavigate('account')} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('account')} className="cursor-pointer">
                  <Heart className="w-4 h-4 mr-2" />
                  Saved Properties
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate('post-property')} className="cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  Post Property
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">My Listings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Help & Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="hidden md:flex items-center space-x-1 shadow-md shadow-[#52a447]/20"
              style={{ backgroundColor: '#52a447' }}
              onClick={() => onNavigate('post-property')}
            >
              <Plus className="w-4 h-4" />
              <span>Post Free</span>
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search - only show when menu is closed */}
        {!isMenuOpen && (
          <div className="xl:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search location, project, or landmark"
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-2 pt-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2.5 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'text-[#52a447] bg-[#52a447]/5 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-100 my-2" />
              <button
                onClick={() => {
                  onNavigate('account');
                  setIsMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                My Account
              </button>
              <button
                onClick={() => {
                  onNavigate('post-property');
                  setIsMenuOpen(false);
                }}
                className="mt-2 w-full py-3 rounded-lg text-center text-white font-semibold"
                style={{ backgroundColor: '#52a447' }}
              >
                Post Property Free
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
