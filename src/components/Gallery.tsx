import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Instagram, ExternalLink } from 'lucide-react';

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&dpr=2',
      alt: 'Classic Scissor Cut',
      service: 'Scissor Cut',
    },
    {
      src: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=500&h=700&dpr=2',
      alt: 'Beard Grooming',
      service: 'Beard Shaping',
    },
    {
      src: 'https://images.pexels.com/photos/1845331/pexels-photo-1845331.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=2',
      alt: 'Modern Fade',
      service: 'Buzz Cut',
    },
    {
      src: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=500&h=800&dpr=2',
      alt: 'Full Service Grooming',
      service: 'Full Service',
    },
    {
      src: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&dpr=2',
      alt: 'Signature Style',
      service: 'Signature Cut',
    },
    {
      src: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=500&h=700&dpr=2',
      alt: 'Hot Towel Shave',
      service: 'Hot Towel Shave',
    },
    {
      src: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=2',
      alt: 'Beard Trim',
      service: 'Beard Grooming',
    },
    {
      src: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=500&h=800&dpr=2',
      alt: 'Classic Cut',
      service: 'Classic Style',
    },
    {
      src: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&dpr=2',
      alt: 'Modern Styling',
      service: 'Modern Cut',
    },
    {
      src: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=500&h=700&dpr=2',
      alt: 'Precision Cut',
      service: 'Precision Styling',
    },
    {
      src: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=2',
      alt: 'Creative Style',
      service: 'Creative Cut',
    },
    {
      src: 'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&w=500&h=800&dpr=2',
      alt: 'Professional Grooming',
      service: 'Professional Style',
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

  const itemVariants = {
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

  const getGridClass = (index: number) => {
    const patterns = [
      'md:row-span-2', '', 'md:col-span-2', '', 
      '', 'md:row-span-2', '', 'md:col-span-2',
      'md:row-span-2', '', '', ''
    ];
    return patterns[index % patterns.length] || '';
  };

  return (
    <section id="gallery" className="py-20 bg-black">
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
            Our Work
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Showcase of our master craftsmanship and attention to detail
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6" />
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-xl cursor-pointer bg-gray-900 ${getGridClass(index)}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white">
                  <h3 className="font-bold text-lg mb-1">{image.service}</h3>
                  <p className="text-yellow-400 text-sm flex items-center space-x-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>View Details</span>
                  </p>
                </div>
              </div>

              {/* Instagram Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-300 mb-6">
            Follow us on Instagram for more inspiration
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5" />
            <span>@heritagexculture</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold text-xl mb-1">{galleryImages[selectedImage].service}</h3>
                <p className="text-yellow-400">{galleryImages[selectedImage].alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;