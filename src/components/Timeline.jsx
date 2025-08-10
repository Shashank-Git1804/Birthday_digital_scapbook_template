import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star, Heart, Sparkles } from 'lucide-react';
import user_1 from "../assets/images/Hide/user_1.png";
import user_2 from "../assets/images/Hide/user_2.png";
import user_3 from "../assets/images/Hide/user_3.png";
import user_4 from "../assets/images/Hide/user_4.png";
import user_5 from "../assets/images/Hide/user_5.png";
import user_6 from "../assets/images/Hide/user_6.png";
import user_7 from "../assets/images/Hide/user_7.png";
import '../App.css';

const Timeline = () => {
  // **TODO: Replace with dynamic data source if needed in future**
  const milestones = [
    {
      id: 1,
      year: '2005',
      title: 'A New Chapter Begins',
      description:
        'The journey starts here — a fresh story full of possibilities and warmth.',
      image: user_1,
      side: 'left'
    },
    {
      id: 2,
      year: '2009',
      title: 'Early Adventures',
      description:
        'First steps into the wider world, filled with curiosity and wonder.',
      image: user_2,
      side: 'right'
    },
    {
      id: 3,
      year: '2013',
      title: 'Discovering Passions',
      description:
        'Moments of joy as new hobbies and talents begin to shine.',
      image: user_3,
      side: 'left'
    },
    {
      id: 4,
      year: '2018',
      title: 'Memories with Loved Ones',
      description:
        'Special days spent with family and friends, creating stories to treasure.',
      image: user_4,
      side: 'right'
    },
    {
      id: 5,
      year: '2021',
      title: 'Stepping Forward',
      description:
        'Entering new phases in life with determination and hope.',
      image: user_5,
      side: 'left'
    },
    {
      id: 6,
      year: '2023',
      title: 'Shared Laughter',
      description:
        'Smiles, inside jokes, and late-night talks that stay in the heart.',
      image: user_6,
      side: 'right'
    },
    {
      id: 7,
      year: '2025',
      title: 'Looking Ahead',
      description:
        'With new dreams in sight, the best chapters are still to come.',
      image: user_7,
      side: 'left'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const milestoneVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="timeline" className="py-20 relative">
      {/* **Background Layer** */}
      <div className="absolute inset-0 scrapbook-paper opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* **Section Header** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-pink-500" />
            <h2 className="handwritten text-responsive-lg text-gray-800">
              Then & Now Timeline
            </h2>
            <Calendar className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A journey through the beautiful moments that have shaped who you are today. 
            Each milestone is a testament to your amazing spirit!
          </p>
        </motion.div>

        {/* **Timeline Content** */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="relative"
          >
            {/* **Central Timeline Line** */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-pink-300 via-lavender-300 to-blue-300 h-full hidden md:block"></div>

            {/* **Milestones Mapping** */}
            <div className="space-y-12 md:space-y-16">
              {milestones.map((milestone) => (
                <motion.div
                  key={milestone.id}
                  variants={milestoneVariants}
                  className={`relative flex items-center ${
                    milestone.side === 'left' 
                      ? 'md:flex-row-reverse md:text-right' 
                      : 'md:flex-row md:text-left'
                  } flex-col text-center`}
                >
                  {/* **Milestone Text Content** */}
                  <div className={`md:w-5/12 ${milestone.side === 'left' ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 scrapbook-shadow"
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* **Year Badge** */}
                      <div className="inline-block bg-gradient-to-r from-pink-400 to-lavender-400 text-white px-4 py-2 rounded-full text-lg font-bold mb-4">
                        {milestone.year}
                      </div>

                      {/* **Title** */}
                      <h3 className="handwritten text-2xl text-gray-800 mb-3">
                        {milestone.title}
                      </h3>

                      {/* **Description** */}
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* **Decorative Icons** */}
                      <div className="mt-4 flex justify-center md:justify-start">
                        <div className="flex gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <Heart className="w-4 h-4 text-pink-400" />
                          <Sparkles className="w-4 h-4 text-blue-400" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* **Timeline Dot (Desktop)** */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-pink-400 rounded-full z-10 shadow-lg">
                    <div className="w-full h-full bg-pink-400 rounded-full animate-pulse"></div>
                  </div>

                  {/* **Milestone Image** */}
                  <div className={`md:w-5/12 ${milestone.side === 'left' ? 'md:pl-8' : 'md:pr-8'} mt-4 md:mt-0`}>
                    <motion.div
                      className="polaroid-frame scrapbook-shadow bg-white max-w-xs mx-auto"
                      whileHover={{ rotate: 0, scale: 1.05 }}
                    >
                      <img
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <p className="handwritten text-sm text-gray-700 text-center">
                        {milestone.year} - {milestone.title}
                      </p>
                    </motion.div>
                  </div>

                  {/* **Timeline Dot (Mobile)** */}
                  <div className="md:hidden w-4 h-4 bg-pink-400 rounded-full mt-4 mb-4"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* **Floating Decorative Elements** */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${5 + i * 12}%`,
                top: `${10 + (i % 4) * 20}%`
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {i % 3 === 0 ? (
                <Star className="w-3 h-3 text-yellow-300 opacity-60" />
              ) : i % 3 === 1 ? (
                <Heart className="w-3 h-3 text-pink-300 opacity-60" />
              ) : (
                <Sparkles className="w-3 h-3 text-blue-300 opacity-60" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
