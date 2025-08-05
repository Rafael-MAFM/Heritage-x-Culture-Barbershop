import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Clock, Star, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const businessHours = [
    { day: 'Monday', hours: '2:00 PM - 6:00 PM' },
    { day: 'Tuesday', hours: '10:00 AM - 8:00 PM' },
    { day: 'Wednesday', hours: '10:00 AM - 8:00 PM' },
    { day: 'Thursday', hours: '10:00 AM - 8:00 PM' },
    { day: 'Friday', hours: '10:00 AM - 8:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 6:00 PM' },
    { day: 'Sunday', hours: '11:00 AM - 6:00 PM' },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Visit Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Located in the heart of Campbell, CA - Easy to find, easy to park
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Address */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 rounded-full p-3">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">Our Location</h3>
                  <p className="text-gray-600 mb-4">
                    2591 S Bascom Ave, Suite D<br />
                    Campbell, CA 95008
                  </p>
                  <motion.a
                    href="https://maps.google.com/?q=2591+S+Bascom+Ave,+Suite+D,+Campbell,+CA+95008"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span>Get Directions</span>
                    <MapPin className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 rounded-full p-3">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-4">
                    Ready to book or have questions? Give us a call!
                  </p>
                  <motion.a
                    href="tel:6693015226"
                    className="inline-flex items-center space-x-2 bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="w-5 h-5" />
                    <span>(669) 301-5226</span>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 rounded-full p-3">
                  <Star className="w-6 h-6 text-black fill-current" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">Customer Reviews</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-2xl font-bold text-black">5.0</span>
                  </div>
                  <p className="text-gray-600">Based on 109+ customer reviews</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.a
                href="https://wa.me/16693015226"
                className="flex items-center justify-center space-x-2 bg-green-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </motion.a>
              
              <motion.a
                href="mailto:info@heritagexculture.com"
                className="flex items-center justify-center space-x-2 bg-gray-800 text-white font-bold py-4 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Map and Hours */}
          <motion.div
            className="space-y-8"
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Google Maps */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-80 bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.5967742665353!2d-121.93235208469221!3d37.28704797983087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e3155b7f8a9a9%3A0x1234567890abcdef!2s2591%20S%20Bascom%20Ave%20%23D%2C%20Campbell%2C%20CA%2095008!5e0!3m2!1sen!2sus!4v1234567890123"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-yellow-400 rounded-full p-3">
                  <Clock className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black">Business Hours</h3>
              </div>
              
              <div className="space-y-3">
                {businessHours.map((item, index) => {
                  const today = new Date().getDay();
                  const dayIndex = index === 6 ? 0 : index + 1; // Adjust for Sunday being 0
                  const isToday = dayIndex === today;
                  
                  return (
                    <div
                      key={item.day}
                      className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                        isToday ? 'bg-yellow-50 border border-yellow-200' : ''
                      }`}
                    >
                      <span className={`font-medium ${isToday ? 'text-yellow-700' : 'text-gray-700'}`}>
                        {item.day}
                      </span>
                      <span className={`${isToday ? 'text-yellow-600 font-semibold' : 'text-gray-600'}`}>
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-700 font-medium">
                  💡 Pro Tip: Call ahead during busy hours to minimize wait time
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;