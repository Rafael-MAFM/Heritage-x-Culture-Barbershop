import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import AuthButton from './auth/AuthButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Barbers', href: '#barbers' },
    { name: 'Book Now', href: '#booking' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/Logo_Background.png" 
              alt="Heritage x Culture Logo" 
              className="w-12 h-12 object-contain"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))'
              }}
            />
            <div>
              <h1 className="text-xl font-bold text-white">Heritage x Culture</h1>
              <p className="text-xs text-yellow-400">Premium Barbershop</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`text-white hover:text-yellow-400 transition-colors font-medium ${
                  item.name === 'Book Now' ? 'bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300' : ''
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
              </motion.a>
            ))}
            
            <motion.a
              href="tel:6693015226"
              className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">(669) 301-5226</span>
            </motion.a>
            
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute left-0 right-0 top-full bg-black/95 backdrop-blur-md border-t border-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block text-white hover:text-yellow-400 transition-colors font-medium py-2 ${
                    item.name === 'Book Now' ? 'bg-yellow-400 text-black px-4 rounded-lg hover:bg-yellow-300 text-center' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              <a
                href="tel:6693015226"
                className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">(669) 301-5226</span>
              </a>
              
              <div className="pt-4 border-t border-gray-700">
                <AuthButton />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;