import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, User, Phone, Mail, MapPin } from 'lucide-react';

const Booking = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedService, setSelectedService] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
  });

  const services = [
    'Scissor Cut - $75',
    'Buzz Cut - $60+',
    'Buzz Cut & Beard - $75',
    'Scissor Cut & Beard - $85+',
    'Beard Shaping - $50+',
    'Signature Haircut - $60',
    'Hot Towel Shave - $80',
    'Full Service - $85',
  ];

  const barbers = [
    'Franco Nguyen',
    'Zeus The Barber',
    'Dgatti (Daniel)',
    'Marcus Rodriguez',
    'Anthony Chen',
    'Rico Santos',
    'David Park',
    'Tommy Wilson',
  ];

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Cal.com or your booking system
    console.log('Booking submitted:', {
      service: selectedService,
      barber: selectedBarber,
      ...formData,
    });
    alert('Booking request submitted! We\'ll contact you to confirm.');
  };

  return (
    <section id="booking" className="py-20 bg-gray-50">
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
            Book Your Appointment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schedule your visit with our master barbers
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-black mb-6 flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-yellow-400" />
              <span>Booking Form</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                >
                  <option value="">Choose a service...</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Barber Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Barber
                </label>
                <select
                  value={selectedBarber}
                  onChange={(e) => setSelectedBarber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="">Any available barber</option>
                  {barbers.map((barber) => (
                    <option key={barber} value={barber}>
                      {barber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Any special requests or preferences..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-yellow-400 text-black font-bold py-4 px-6 rounded-lg hover:bg-yellow-300 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Appointment
              </motion.button>
            </form>
          </motion.div>

          {/* Cal.com Integration Placeholder & Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Cal.com Placeholder */}
            <div className="bg-black rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <Clock className="w-6 h-6 text-yellow-400" />
                <span>Real-Time Booking</span>
              </h3>
              <div className="bg-gray-900 rounded-lg p-6 text-center">
                <div className="text-yellow-400 text-6xl mb-4">📅</div>
                <p className="text-gray-300 mb-4">
                  Cal.com integration will be embedded here for real-time booking
                </p>
                <div className="text-sm text-gray-400">
                  <p>To set up Cal.com integration:</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-left">
                    <li>Create a Cal.com account</li>
                    <li>Set up your services and availability</li>
                    <li>Get your embed code</li>
                    <li>Add VITE_CAL_COM_LINK to .env file</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-black mb-6">Quick Contact</h3>
              
              <div className="space-y-4">
                <motion.a
                  href="tel:6693015226"
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-yellow-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Phone className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="font-semibold text-black">Call Now</div>
                    <div className="text-gray-600">(669) 301-5226</div>
                  </div>
                </motion.a>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="font-semibold text-black">Location</div>
                    <div className="text-gray-600">2591 S Bascom Ave, Suite D<br />Campbell, CA 95008</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="font-semibold text-black">Hours</div>
                    <div className="text-gray-600 text-sm">
                      <div>Mon: 2:00 PM - 6:00 PM</div>
                      <div>Tue-Fri: 10:00 AM - 8:00 PM</div>
                      <div>Sat: 10:00 AM - 6:00 PM</div>
                      <div>Sun: 11:00 AM - 6:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Booking;