import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Scissors, Clock, DollarSign } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      name: 'Scissor Cut',
      price: '$75',
      duration: '60 min',
      description: 'Precision scissor cut with styling and finish',
      popular: false,
    },
    {
      name: 'Buzz Cut',
      price: '$60+',
      duration: '60 min',
      description: 'Clean buzz cut with fade options',
      popular: false,
    },
    {
      name: 'Buzz Cut & Beard',
      price: '$75',
      duration: '75 min',
      description: 'Complete buzz cut with beard grooming',
      popular: true,
    },
    {
      name: 'Scissor Cut & Beard',
      price: '$85+',
      duration: '80 min',
      description: 'Full service cut and beard shaping',
      popular: true,
    },
    {
      name: 'Beard Shaping',
      price: '$50+',
      duration: '30 min',
      description: 'Professional beard trim and styling',
      popular: false,
    },
    {
      name: 'Signature Haircut',
      price: '$60',
      duration: '45 min',
      description: 'Our signature style with consultation',
      popular: false,
    },
    {
      name: 'Cut & Beard',
      price: '$75',
      duration: '60 min',
      description: 'Complete grooming package',
      popular: true,
    },
    {
      name: 'Hot Towel Shave',
      price: '$80',
      duration: '60 min',
      description: 'Traditional hot towel straight razor shave',
      popular: false,
    },
    {
      name: 'Full Service',
      price: '$85',
      duration: '60 min',
      description: 'The complete Heritage x Culture experience',
      popular: false,
    },
    {
      name: 'Eyebrows',
      price: '$13',
      duration: '30 min',
      description: 'Eyebrow trimming and shaping',
      popular: false,
    },
    {
      name: 'Blow Dry & Styling',
      price: '$30',
      duration: '30 min',
      description: 'Professional blow dry and styling',
      popular: false,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
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
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium grooming services crafted with precision and care
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6" />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Scissors className="w-8 h-8 text-yellow-400" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-black">{service.price}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-yellow-600 transition-colors">
                  {service.name}
                </h3>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                </div>

                <motion.button
                  className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors group-hover:bg-yellow-400 group-hover:text-black"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book This Service
                </motion.button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-yellow-400/10 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-600 mb-6">
            Not sure which service is right for you?
          </p>
          <motion.a
            href="#booking"
            className="inline-flex items-center space-x-2 bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Book a Consultation</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;