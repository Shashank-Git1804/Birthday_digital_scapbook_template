import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Heart, Trash2, Infinity } from 'lucide-react';
import first_pic_z from "../assets/images/Hide/1st_pic_z.jpg";
import bff from "../assets/images/Hide/best_frn.jpg";
import whole_fam from "../assets/images/Hide/whole_fam.jpg";
import snow_cousins from "../assets/images/Hide/snow_cousins.jpg";
import udupi_trip from "../assets/images/Hide/udupi_trip.jpg";
import mom_daughter from "../assets/images/Hide/mom_daughter.jpg";
import '../App.css';

const staticPhotos = [ 
  {
    id: 1,
    src: first_pic_z,
    caption: 'First photo of you captured on a mobile phone',
    year: '2007',
    category: 'childhood',
  },
  {
    id: 2,
    src: mom_daughter,
    caption: 'First dance performance — so excited!',
    year: '2010',
    category: 'childhood',
  },
  {
    id: 3,
    src: whole_fam,
    caption: 'Family portrait — all together',
    year: '2012',
    category: 'family',
  },
  {
    id: 4,
    src: snow_cousins,
    caption: 'Snow-city adventure with cousins',
    year: '2017',
    category: 'travel',
  },
  {
    id: 5,
    src: udupi_trip,
    caption: 'Udupi trip — we made it happen!',
    year: '2025',
    category: 'travel',
  },
  { 
    id: 6,
    src: bff,
    caption: 'Best friends forever ∞',
    year: 'Forever ∞',
    category: 'friends',
  },
];


const PhotoGallery = () => {
  const [photos, setPhotos] = useState(staticPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => setSelectedPhoto(null);

  const navigatePhoto = (direction) => {
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % photos.length
        : (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const deletePhoto = (id) => {
    const updated = photos.filter((photo) => photo.id !== id);
    setPhotos(updated);
    if (selectedPhoto?.id === id) closeLightbox();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="gallery" className="py-20 relative">
      <div className="absolute inset-0 scrapbook-paper opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-pink-500" />
            <h2 className="handwritten text-responsive-lg text-gray-800">
              Memory Lane
            </h2>
            <Camera className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of beautiful moments captured through the years.
            Each photo tells a story of joy, growth, and unforgettable memories.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={photoVariants}
              className="group cursor-pointer relative"
              onClick={() => openLightbox(photo, index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="polaroid-frame scrapbook-shadow bg-white">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-3">
                      <Heart className="w-6 h-6 text-pink-500" />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePhoto(photo.id);
                    }}
                    className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded-full shadow hover:bg-red-100"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center">
                  <p className="handwritten text-lg text-gray-700 mb-1">
                    {photo.caption}
                  </p>
                  <span className="text-sm text-gray-500">{photo.year}</span>
                </div>
                <div className="tape-effect" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => deletePhoto(selectedPhoto.id)}
                className="absolute top-4 right-4 bg-white text-red-600 px-3 py-1 rounded shadow hover:bg-red-100 z-50"
              >
                Delete
              </button>

              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <button
                onClick={() => navigatePhoto('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-pink-300 transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() => navigatePhoto('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-pink-300 transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
              <div className="bg-white p-6 rounded-lg">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full max-h-96 object-contain rounded-lg mb-4"
                />
                <div className="text-center">
                  <p className="handwritten text-xl text-gray-800 mb-2">
                    {selectedPhoto.caption}
                  </p>
                  <span className="text-gray-600">{selectedPhoto.year}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;

