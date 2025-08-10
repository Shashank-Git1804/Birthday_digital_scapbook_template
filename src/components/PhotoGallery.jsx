import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Heart, Trash2 } from 'lucide-react';
import user_1 from "../assets/images/Hide/user_1.png";
import user_2 from "../assets/images/Hide/user_2.png";
import user_3 from "../assets/images/Hide/user_3.png";
import user_4 from "../assets/images/Hide/user_4.png";
import user_5 from "../assets/images/Hide/user_5.png";
import user_6 from "../assets/images/Hide/user_6.png";
import '../App.css';

// **📸 Static Photo Data**
// **TODO: Replace `src` with your own image imports**
// **TODO: Update `caption`, `year`, and `category` to match your real photos**
const staticPhotos = [ 
  {
    id: 1,
    src: user_1,
    caption: 'The beginning of a beautiful story',
    year: '2004',
    category: 'beginnings',
  },
  {
    id: 2,
    src: user_2,
    caption: 'A joyful celebration to remember',
    year: '2008',
    category: 'celebrations',
  },
  {
    id: 3,
    src: user_3,
    caption: 'Cherished moments with loved ones',
    year: '2011',
    category: 'family',
  },
  {
    id: 4,
    src: user_4,
    caption: 'Exploring new horizons',
    year: '2016',
    category: 'adventures',
  },
  {
    id: 5,
    src: user_5,
    caption: 'A day filled with laughter and sunshine',
    year: '2019',
    category: 'getaways',
  },
  { 
    id: 6,
    src: user_6,
    caption: 'Bonds that stand the test of time',
    year: '2023',
    category: 'friendship',
  },
];

const PhotoGallery = () => {
  const [photos, setPhotos] = useState(staticPhotos); // **Holds the gallery photo list**
  const [selectedPhoto, setSelectedPhoto] = useState(null); // **Currently opened photo in lightbox**
  const [currentIndex, setCurrentIndex] = useState(0); // **Tracks index for lightbox navigation**

  // **Open photo in lightbox**
  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  // **Close the lightbox**
  const closeLightbox = () => setSelectedPhoto(null);

  // **Navigate to next or previous photo**
  const navigatePhoto = (direction) => {
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % photos.length
        : (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  // **Delete a photo**
  // **TODO: Decide if delete should be permanent or temporary**
  const deletePhoto = (id) => {
    const updated = photos.filter((photo) => photo.id !== id);
    setPhotos(updated);
    if (selectedPhoto?.id === id) closeLightbox();
  };

  // **Animation container variants**
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // **Animation for individual photos**
  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="gallery" className="py-20 relative">
      {/* **Background texture overlay** */}
      <div className="absolute inset-0 scrapbook-paper opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* **Section Heading** */}
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

        {/* **Photo Grid** */}
        {/* **TODO: Adjust grid columns if you want more/fewer images per row** */}
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
                  {/* **Hover overlay** */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-3">
                      <Heart className="w-6 h-6 text-pink-500" />
                    </div>
                  </div>

                  {/* **Delete button** */}
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
                {/* **Caption and year** */}
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

      {/* **Lightbox Modal** */}
      {/* **TODO: Add swipe support for mobile** */}
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
              {/* **Delete button inside lightbox** */}
              <button
                onClick={() => deletePhoto(selectedPhoto.id)}
                className="absolute top-4 right-4 bg-white text-red-600 px-3 py-1 rounded shadow hover:bg-red-100 z-50"
              >
                Delete
              </button>

              {/* **Close lightbox button** */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* **Navigation buttons** */}
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

              {/* **Selected Photo Content** */}
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
