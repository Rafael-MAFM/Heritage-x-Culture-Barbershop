import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Instagram, ExternalLink, Filter, Upload, Loader } from 'lucide-react';
import { useGallery } from '../hooks/useGallery';
import { useAuth } from '../contexts/AuthContext';
import { optimizeImageUrl } from '../lib/googleStorage';
import ImageUpload from './gallery/ImageUpload';

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { profile } = useAuth();
  const {
    images,
    loading,
    selectedCategory,
    categories,
    filterByCategory,
    canUpload
  } = useGallery();

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);

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

        {/* Filter Bar */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => filterByCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </motion.button>
            ))}
            
            {/* Upload Button for Admins */}
            {canUpload && (
              <motion.button
                onClick={() => setShowUpload(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className={`group relative overflow-hidden rounded-xl cursor-pointer bg-gray-900 ${getGridClass(index)}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(index)}
              >
                {image.contentType?.startsWith('video/') ? (
                  <video
                    src={image.url}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                ) : (
                  <img
                    src={optimizeImageUrl(image.url, 500, 600)}
                    alt={image.title || 'Gallery media'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
                
                {/* Featured Badge */}
                {image.is_featured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-yellow-400 text-sm flex items-center space-x-1">
                      <ExternalLink className="w-3 h-3" />
                      <span>View Details</span>
                    </p>
                    {image.category && (
                      <p className="text-gray-300 text-xs mt-1 capitalize">
                        {image.category.replace('-', ' ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Instagram Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Empty State */}
        {!loading && images.length === 0 && (
          <div className="text-center py-20">
            <Instagram className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No media found</h3>
            <p className="text-gray-400">Check back soon for more amazing work!</p>
          </div>
        )}

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
            href={import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com/heritagexculture"}
            target="_blank"
            rel="noopener noreferrer"
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
              {images[selectedImage].contentType?.startsWith('video/') ? (
                <video
                  src={images[selectedImage].url}
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <img
                  src={images[selectedImage].url}
                  alt={images[selectedImage].title || 'Gallery media'}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}
              
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold text-xl mb-1">{images[selectedImage].title}</h3>
                {images[selectedImage].category && (
                  <p className="text-yellow-400 capitalize">{images[selectedImage].category.replace('-', ' ')}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <ImageUpload
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
      />
    </section>
  );
};

export default Gallery;