import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Calendar } from 'lucide-react';

const Barbers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleBookBarber = (barberName: string) => {
    // Scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Set the selected barber in the booking form after a short delay
      setTimeout(() => {
        // Find all select elements
        const selects = document.querySelectorAll('select');
        
        // Find the barber select
        selects.forEach((select) => {
          const selectElement = select as HTMLSelectElement;
          const options = Array.from(selectElement.options);
          
          // Check if this is the barber select by looking for barber names
          const hasBarbers = options.some(opt => 
            opt.text.includes('Franco') || 
            opt.text.includes('Zeus') || 
            opt.text.includes('Any available barber')
          );
          
          if (hasBarbers) {
            // Find and select the matching barber
            for (let i = 0; i < selectElement.options.length; i++) {
              if (selectElement.options[i].text.includes(barberName)) {
                selectElement.value = selectElement.options[i].value;
                // Trigger change event
                const event = new Event('change', { bubbles: true });
                selectElement.dispatchEvent(event);
                
                // Highlight the select element briefly
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

  const barbers = [
    {
      name: 'Franco Nguyen',
      specialty: 'Scissor Cuts & Fades',
      experience: '8 years',
      bio: 'Master of precision cuts with an eye for modern styling and classic techniques.',
      image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 5.0,
    },
    {
      name: 'Zeus The Barber',
      specialty: 'Beard Grooming & Shaves',
      experience: '12 years',
      bio: 'Legendary beard artist known for transformative grooming and hot towel shaves.',
      image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 5.0,
    },
    {
      name: 'Dgatti (Daniel)',
      specialty: 'Signature Cuts',
      experience: '6 years',
      bio: 'Creative stylist specializing in contemporary cuts and personalized consultations.',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.9,
    },
    {
      name: 'Marcus Rodriguez',
      specialty: 'Buzz Cuts & Fades',
      experience: '5 years',
      bio: 'Precision specialist with expertise in military cuts and modern fade techniques.',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.8,
    },
    {
      name: 'Anthony Chen',
      specialty: 'Classic Cuts',
      experience: '10 years',
      bio: 'Traditional barber with mastery in timeless styles and gentleman\'s grooming.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.9,
    },
    {
      name: 'Rico Santos',
      specialty: 'Modern Styling',
      experience: '7 years',
      bio: 'Trendsetter known for innovative cuts and contemporary styling techniques.',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.9,
    },
    {
      name: 'David Park',
      specialty: 'Full Service',
      experience: '9 years',
      bio: 'Complete grooming expert offering comprehensive barbering and styling services.',
      image: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 5.0,
    },
    {
      name: 'Tommy Wilson',
      specialty: 'Creative Cuts',
      experience: '4 years',
      bio: 'Young talent bringing fresh perspectives and artistic flair to every cut.',
      image: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.8,
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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="barbers" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Master Barbers
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Meet our team of skilled professionals dedicated to perfecting your style
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6" />
        </motion.div>

        {/* Barbers Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {barbers.map((barber, index) => (
            <motion.div
              key={barber.name}
              className="group bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              {/* Barber Image */}
              <div className="relative overflow-hidden">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{barber.rating}</span>
                </div>
              </div>

              {/* Barber Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                  {barber.name}
                </h3>
                
                <div className="text-yellow-400 text-sm font-medium mb-2">
                  {barber.specialty}
                </div>
                
                <div className="text-gray-400 text-xs mb-3">
                  {barber.experience} experience
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {barber.bio}
                </p>

                <motion.button
                  onClick={() => handleBookBarber(barber.name)}
                  className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book with {barber.name.split(' ')[0]}</span>
                </motion.button>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-yellow-400/5 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-300 mb-6">
            Each barber brings their own unique style and expertise
          </p>
          <motion.a
            href="#booking"
            className="inline-flex items-center space-x-2 bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-5 h-5" />
            <span>Book Your Appointment</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Barbers;