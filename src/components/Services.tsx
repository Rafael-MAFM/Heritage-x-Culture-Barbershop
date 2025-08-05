import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Scissors, Clock, Star, Sparkles, Crown, Zap } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      name: 'Scissor Cut',
      price: 75,
      duration: '60 min',
      description: 'Precision scissor cut with styling and finish',
      popular: false,
      icon: '✂️',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      name: 'Buzz Cut',
      price: 60,
      priceModifier: '+',
      duration: '60 min',
      description: 'Clean buzz cut with fade options',
      popular: false,
      icon: '✂️',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      name: 'Buzz Cut & Beard',
      price: 75,
      duration: '75 min',
      description: 'Complete buzz cut with beard grooming',
      popular: true,
      icon: '✂️',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    {
      name: 'Scissor Cut & Beard',
      price: 85,
      priceModifier: '+',
      duration: '80 min',
      description: 'Full service cut and beard shaping',
      popular: true,
      icon: '✂️',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    {
      name: 'Beard Shaping',
      price: 50,
      priceModifier: '+',
      duration: '30 min',
      description: 'Professional beard trim and styling',
      popular: false,
      icon: '✂️',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      name: 'Signature Haircut',
      price: 60,
      duration: '45 min',
      description: 'Our signature style with consultation',
      popular: false,
      icon: '✂️',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      name: 'Cut & Beard',
      price: 75,
      duration: '60 min',
      description: 'Complete grooming package',
      popular: true,
      icon: '✂️',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    {
      name: 'Hot Towel Shave',
      price: 80,
      duration: '60 min',
      description: 'Traditional hot towel straight razor shave',
      popular: false,
      icon: '✂️',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      name: 'Full Service',
      price: 85,
      duration: '60 min',
      description: 'The complete Heritage x Culture experience',
      popular: false,
      icon: '✂️',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      name: 'Eyebrows',
      price: 13,
      duration: '30 min',
      description: 'Eyebrow trimming and shaping',
      popular: false,
      icon: '✂️',
      gradient: 'from-gray-800 to-gray-900',
    },
    {
      name: 'Blow Dry & Styling',
      price: 30,
      duration: '30 min',
      description: 'Professional blow dry and styling',
      popular: false,
      icon: '✂️',
      gradient: 'from-gray-800 to-gray-900',
    },
  ];

  const handleBookService = (serviceName: string, price: number) => {
    // Scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Set the selected service in the booking form after a short delay
      setTimeout(() => {
        // Find all select elements
        const selects = document.querySelectorAll('select');
        
        // Find the service select (first select element that contains service options)
        selects.forEach((select) => {
          const selectElement = select as HTMLSelectElement;
          const options = Array.from(selectElement.options);
          
          // Check if this is the service select by looking for service names
          const hasServices = options.some(opt => 
            opt.text.includes('Scissor Cut') || 
            opt.text.includes('Buzz Cut') || 
            opt.text.includes('Choose a service')
          );
          
          if (hasServices) {
            // Find and select the matching service
            for (let i = 0; i < selectElement.options.length; i++) {
              const optionText = selectElement.options[i].text;
              if (optionText.includes(serviceName)) {
                selectElement.value = selectElement.options[i].value;
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                selectElement.dispatchEvent(event);
                
                // Also highlight the select element briefly
                selectElement.style.borderColor = '#FFD700';
                selectElement.style.borderWidth = '2px';
                setTimeout(() => {
                  selectElement.style.borderColor = '';
                  selectElement.style.borderWidth = '';
                }, 2000);
                break;
              }
            }
          }
        });
      }, 800);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-yellow-400/10 px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-600">PREMIUM SERVICES</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of traditional barbering techniques and modern styling
          </p>
          
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-2 md:px-0"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="group relative pt-4"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={`absolute inset-0 top-4 bg-gradient-to-br ${service.popular ? 'from-yellow-400 to-yellow-600' : 'from-gray-200 to-gray-300'} rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-20`} />
              
              <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-visible border border-gray-100">
                {/* Popular Badge - Fixed positioning */}
                {service.popular && (
                  <motion.div 
                    className="absolute -top-3 -right-3 z-20"
                    initial={{ rotate: -15, scale: 0 }}
                    animate={{ rotate: 12, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 200 }}
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1 whitespace-nowrap">
                      <Crown className="w-3 h-3" />
                      <span>POPULAR</span>
                    </div>
                  </motion.div>
                )}

                {/* Card Content */}
                <div className="p-8">
                  {/* Icon and Price Row */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.popular ? 'from-yellow-400 to-yellow-500' : 'from-gray-100 to-gray-200'} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                    >
                      <span className="text-2xl">{service.icon}</span>
                    </motion.div>
                    
                    <div className="text-right">
                      <div className="flex items-start">
                        <span className="text-lg font-bold text-gray-500 mt-1">$</span>
                        <span className="text-4xl font-black text-black">{service.price}</span>
                        {service.priceModifier && (
                          <span className="text-2xl font-bold text-gray-500 mt-1">{service.priceModifier}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Service Name */}
                  <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-yellow-600 transition-colors">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center space-x-2 text-gray-500 mb-6">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium">{service.duration}</span>
                  </div>

                  {/* Book Button */}
                  <motion.button
                    onClick={() => handleBookService(service.name, service.price)}
                    className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 transform ${
                      service.popular 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600' 
                        : 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Book This Service</span>
                      <Zap className="w-4 h-4" />
                    </span>
                  </motion.button>
                </div>

                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${service.popular ? 'from-yellow-400/0 via-yellow-400/0 to-yellow-400/10' : 'from-gray-100/0 via-gray-100/0 to-gray-100/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-black to-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-400 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-yellow-400 rounded-full filter blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Not Sure Which Service to Choose?</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Our expert barbers are here to help you find the perfect style that suits your personality and lifestyle.
              </p>
              
              <motion.button
                onClick={() => {
                  const bookingSection = document.getElementById('booking');
                  if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-10 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Book a Free Consultation</span>
                <Star className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;