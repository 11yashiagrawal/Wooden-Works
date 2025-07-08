import React from 'react';
import { Mail, Phone, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-amber-100">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-cursive mb-4">Wooden Works</h3>
            <p className="mb-4 font-serif text-sm sm:text-base">
              Bringing nature's beauty into your home with our handcrafted wooden products.
              Each piece tells a story of craftsmanship and tradition.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-amber-200 transition-colors p-2">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/wooden_workkss_?igsh=MXhtZnh5MzQ0MXVx" className="hover:text-amber-200 transition-colors p-2">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-cursive mb-4">Contact Us</h3>
            <ul className="space-y-2 font-serif text-sm sm:text-base">
              <li className="flex items-center justify-center md:justify-start">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>9935899464</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>sonali.agrawal.lko@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="font-serif text-xs sm:text-sm">&copy; {new Date().getFullYear()} <span className="font-cursive text-base sm:text-lg">Wooden Works</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;