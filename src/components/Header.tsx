import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X, ChevronDown } from 'lucide-react';
import { useProductContext } from '../context/ProductContext';
import { slugify } from '../utils/slugify';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { categories } = useProductContext();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCategoryDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div 
        className={`transition-all duration-300 border-b border-amber-700 shadow-sm ${
          isScrolled ? 'bg-amber-900/95 text-amber-50 shadow-md' : 'bg-amber-900/80 text-amber-50'
        }`}
      >
        <div className="w-full max-w-full container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between w-full">
            <Link 
              to="/" 
              className="text-2xl sm:text-3xl md:text-4xl font-cursive font-bold tracking-wide flex items-center text-amber-100"
            >
              <span className="inline-block mr-2 transform -rotate-12">
                <ShoppingBag size={20} className="sm:w-6 sm:h-6" />
              </span>
              <span className="hidden sm:inline">Wooden Works</span>
              <span className="sm:hidden">Wooden Works</span>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link 
                to="/" 
                className="font-serif text-base lg:text-lg hover:text-amber-200 transition-colors"
              >
                Home
              </Link>
              {/* Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="flex items-center font-serif text-base lg:text-lg hover:text-amber-200 transition-colors focus:outline-none"
                >
                  Categories
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {isCategoryDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-screen max-w-xs sm:w-80 md:w-96 lg:w-[28rem] sm:max-w-none rounded-md shadow-lg bg-amber-100 ring-1 ring-black ring-opacity-5 z-50 max-h-[80vh] overflow-y-auto">
                    <div className="py-2">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          to={`/products/category/${slugify(category.name)}`}
                          className="block text-base sm:text-lg font-serif text-amber-900 hover:text-amber-700 hover:bg-amber-100 px-4 sm:px-6 py-2 sm:py-3 rounded transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                          onClick={() => setIsCategoryDropdownOpen(false)}
                        >
                          <span className="truncate">{capitalize(category.name)}</span>
                          {category.products.length > 0 && (
                            <span className="ml-2 text-xs sm:text-sm text-amber-600">
                              ({category.products.length})
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-amber-100 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-800 text-amber-100 max-h-[80vh] overflow-y-auto border-b border-amber-700 shadow-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <Link 
              to="/" 
              className="py-3 font-medium border-b border-amber-700 text-base"
            >
              Home
            </Link>
            {categories.map(category => (
              <Link 
                key={category.name}
                to={`/products/category/${slugify(category.name)}`} 
                className="py-3 font-medium border-b border-amber-700 text-base flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{capitalize(category.name)}</span>
                {category.products.length > 0 && (
                  <span className="ml-2 text-xs text-amber-300">
                    ({category.products.length})
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;