import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Clock, MapPin } from 'lucide-react';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour * 60 + minute;

      let isCurrentlyOpen = false;

      switch (day) {
        case 1: // Monday
          isCurrentlyOpen = currentTime >= 14 * 60 && currentTime < 18 * 60;
          break;
        case 2: // Tuesday
        case 3: // Wednesday
        case 4: // Thursday
        case 5: // Friday
          isCurrentlyOpen = currentTime >= 10 * 60 && currentTime < 20 * 60;
          break;
        case 6: // Saturday
          isCurrentlyOpen = currentTime >= 10 * 60 && currentTime < 18 * 60;
          break;
        case 0: // Sunday
          isCurrentlyOpen = currentTime >= 11 * 60 && currentTime < 18 * 60;
          break;
      }

      setIsOpen(isCurrentlyOpen);
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Logo Image */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="/Logo_Background.png" 
            alt="Heritage x Culture Barbershop Logo" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.5))'
            }}
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="block">Heritage</span>
          <span className="text-yellow-400">x</span>
          <span className="block">Culture</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Where Tradition Meets Style
        </motion.p>

        {/* Status Indicator */}
        <motion.div
          className="flex items-center justify-center space-x-2 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className="text-white font-medium">
            {isOpen ? 'Open Now' : 'Closed'} • Campbell, CA
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            href="#booking"
            className="bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg text-lg hover:bg-yellow-300 transition-colors shadow-lg flex items-center space-x-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-5 h-5" />
            <span>Book Your Appointment</span>
          </motion.a>

          <motion.a
            href="tel:6693015226"
            className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-black transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-5 h-5" />
            <span>(669) 301-5226</span>
          </motion.a>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="text-center">
            <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">Hours Today</h3>
            <p className="text-gray-300 text-sm">10:00 AM - 8:00 PM</p>
          </div>
          
          <div className="text-center">
            <MapPin className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">Location</h3>
            <p className="text-gray-300 text-sm">Campbell, CA</p>
          </div>
          
          <div className="text-center">
            <div className="text-yellow-400 text-2xl mx-auto mb-2">⭐</div>
            <h3 className="text-white font-semibold mb-1">Rating</h3>
            <p className="text-gray-300 text-sm">5.0 • 109+ Reviews</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;