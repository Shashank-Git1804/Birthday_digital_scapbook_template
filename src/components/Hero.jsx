import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import { Clock, Heart, Star } from 'lucide-react';
// **TODO: Change to your desired image**
import default_pic from '../assets/images/Hide/user_icon.jpg';
import '../App.css';

const Hero = () => {
  // **TODO: Change this name**
  const celebrantName = 'Your Name Here';

  // **TODO: Set birthday month & day (MM-DD)**
  const birthdayDate = '01-01';

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isBirthday, setIsBirthday] = useState(false);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [hasStartedCelebration, setHasStartedCelebration] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [width, height] = useWindowSize();

  const testMode = false;

  const getNextBirthday = () => {
    const now = new Date();
    const thisYear = now.getFullYear();
    const birthdayThisYear = new Date(`${thisYear}-${birthdayDate}T00:00:00`);

    if (testMode) return new Date(now.getTime() + 10000); // 10s test

    return now > birthdayThisYear
      ? new Date(`${thisYear + 1}-${birthdayDate}T00:00:00`)
      : birthdayThisYear;
  };

  useEffect(() => {
    let nextBirthday = getNextBirthday();
    setCurrentYear(nextBirthday.getFullYear());

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextBirthday.getTime() - now;

      if (distance <= 0 && !countdownFinished) {
        setCountdownFinished(true);
      }

      const updatedDistance = Math.max(0, nextBirthday.getTime() - now);

      setTimeLeft({
        days: Math.floor(updatedDistance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((updatedDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((updatedDistance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((updatedDistance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownFinished]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const isGlowing = countdownFinished && !hasStartedCelebration;
  const themeColor = isGlowing ? 'yellow' : 'pink';

  return (
    <section
      id="hero"
      className="pt-28 md:pt-0 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {isBirthday && <Confetti width={width} height={height} numberOfPieces={300} />}

      {isBirthday && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <div className="text-center bg-white p-8 rounded-xl shadow-2xl border-4 border-yellow-300 max-w-lg">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 handwritten mb-4">
              🎉 Happy Birthday {celebrantName}! 🎉
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              May your year be full of love, magic, and unforgettable memories ✨
            </p>
            <motion.button
              onClick={() => {
                setIsBirthday(false);
                setHasStartedCelebration(true);
              }}
              className="btn-pastel px-6 py-3 rounded-xl bg-yellow text-white font-bold mt-2 shadow-lg hover:bg-yellow-500"
            >
              Let’s Continue →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Background */}
      <div className="absolute inset-0 scrapbook-paper opacity-30"></div>
      <div className="absolute inset-0 confetti-bg"></div>

      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-4 h-4 text-pink-300 opacity-60" />
            ) : i % 3 === 1 ? (
              <Star className="w-4 h-4 text-yellow-300 opacity-60" />
            ) : (
              <div className="w-3 h-3 rounded-full bg-lavender-300 opacity-60"></div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8 mt-14">
            <h1 className="handwritten text-responsive-xl text-gray-800 mb-4">
              Happy Birthday, {celebrantName}!
            </h1>
            <p className="text-responsive-md text-gray-600 max-w-2xl mx-auto">
              Welcome to your very own digital scrapbook, filled with love, memories,
              and all the wonderful moments that make you so special.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12 flex justify-center">
            <div className="polaroid-frame scrapbook-shadow max-w-sm">
              <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
                <img
                  src={default_pic}
                  alt="Celebration Memory"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="handwritten text-lg text-gray-700 text-center">
                Another year of amazing memories! ✨
              </p>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            variants={itemVariants}
            className={`mb-8 cursor-pointer transition-all duration-500 ${
              isGlowing ? 'animate-glow' : ''
            }`}
            onClick={() => {
              if (isGlowing) setIsBirthday(true);
            }}
          >
            {isGlowing && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`handwritten text-xl mb-2 ${
                  isGlowing ? 'text-yellow-500' : 'text-pink-500'
                }`}
              >
                ✨ Tap me to celebrate! ✨
              </motion.div>
            )}

            <div
              className={`backdrop-blur-sm rounded-2xl p-6 scrapbook-shadow max-w-2xl mx-auto border-4 ${
                isGlowing ? 'bg-yellow-100 border-yellow-400' : 'bg-white/80 border-pink-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className={`w-6 h-6 ${isGlowing ? 'text-yellow-500' : 'text-pink-500'}`} />
                <h3 className="handwritten text-2xl text-gray-800">
                  {`Birthday Countdown for ${currentYear}`}
                </h3>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div
                      className={`rounded-lg p-3 mb-2 ${
                        isGlowing ? 'bg-yellow-200' : 'bg-pink-100'
                      }`}
                    >
                      <span
                        className={`text-2xl md:text-3xl font-bold ${
                          isGlowing ? 'text-yellow-600' : 'text-pink-600'
                        }`}
                      >
                        {value.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 capitalize">{unit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg text-gray-600 mb-6">
              Scroll down to explore your special day! 🎉
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-pink-400 rounded-full mt-2"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
