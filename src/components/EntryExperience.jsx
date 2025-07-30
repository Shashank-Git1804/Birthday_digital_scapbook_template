import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import '../App.css';

const EntryExperience = ({ onEnter }) => {
  const [countdown, setCountdown] = useState(3);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShowButton(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    color: ['#FFB6C1', '#87CEEB', '#E6E6FA', '#98FB98', '#FFFFE0'][Math.floor(Math.random() * 5)]
  }));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #FFFDD0 0%, #E6E6FA 50%, #FFB6C1 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Confetti Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: piece.color,
                left: `${piece.x}%`,
                top: '-20px'
              }}
              initial={{ y: -20, rotate: 0 }}
              animate={{
                y: window.innerHeight + 20,
                rotate: 360,
                x: [0, 30, -30, 0]
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="text-center z-10 px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="mb-8"
          >
            <Heart className="w-16 h-16 mx-auto text-pink-400 mb-4" />
            <h1 className="handwritten text-responsive-xl text-gray-800 mb-2">
              Happy Birthday KantriKulli!
            </h1>
            <p className="text-responsive-md text-gray-600">
              A digital scrapbook filled with love and memories
            </p>
          </motion.div>

          {countdown > 0 && (
            <motion.div
              key={countdown}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-6xl handwritten text-pink-500 mb-2">
                {countdown}
              </div>
              <p className="text-gray-600">Get ready for something special...</p>
            </motion.div>
          )}

          {showButton && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
              onClick={onEnter}
              className="btn-pastel flex items-center gap-2 mx-auto text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5" />
              Let's Celebrate!
              <Sparkles className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Heart className="w-6 h-6 text-pink-300 opacity-60" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EntryExperience;

