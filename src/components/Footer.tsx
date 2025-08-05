import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Scissors, Clock, Star } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Barbers', href: '#barbers' },
    { name: 'Book Now', href: '#booking' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Scissor Cut',
    'Buzz Cut & Beard',
    'Hot Towel Shave',
    'Beard Shaping',
    'Full Service',
    'Signature Cut',
  ];

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Scissors className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Heritage x Culture</h3>
                <p className="text-yellow-400 text-sm">Premium Barbershop</p>
              </div>
            </motion.div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Where tradition meets style. Experience the finest in men's grooming with our master barbers 
              who blend classic techniques with modern aesthetics.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">
                  2591 S Bascom Ave, Suite D, Campbell, CA 95008
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-yellow-400" />
                <a href="tel:6693015226" className="text-gray-300 text-sm hover:text-yellow-400 transition-colors">
                  (669) 301-5226
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-yellow-400" />
                <a href="mailto:info@heritagexculture.com" className="text-gray-300 text-sm hover:text-yellow-400 transition-colors">
                  info@heritagexculture.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-gray-300 text-sm">5.0 Rating • 109+ Reviews</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Popular Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <motion.a
                    href="#services"
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
            
            <motion.a
              href="#booking"
              className="inline-block mt-6 bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors text-sm"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-yellow-400" />
            <h4 className="text-lg font-semibold">Business Hours</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            <div className="text-sm">
              <div className="font-medium text-yellow-400">Mon</div>
              <div className="text-gray-300">2PM-6PM</div>
            </div>
            <div className="text-sm">
              <div className="font-medium text-yellow-400">Tue</div>
              <div className="text-gray-300">10AM-8PM</div>
            </div>
            <div className="text-sm">
              <div className="font-medium text-yellow-400">Wed</div>
              <div className="text-gray-300">10AM-8PM</div>
            </div>
            <div className="text-sm">
              <div className="font-medium text-yellow-400">Thu</div>
              <div className="text-gray-300">10AM-8PM</div>
            </div>
            <div className="text-sm">
              <div className="font-medium text-yellow-400">Fri</div>
              <div className="text-gray-300">10AM-8PM</div>
            </div>
            <div className="text-sm">
              <div className="font-medium text-yellow-400">Sat</div>
              <div className="text-gray-300">10AM-6PM</div>
            </div>
            <div className="text-sm">
              <div className="font-medium text-yellow-400">Sun</div>
              <div className="text-gray-300">11AM-6PM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-300 mb-6">Get the latest news and exclusive offers</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <motion.button
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Heritage x Culture Barbershop. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;