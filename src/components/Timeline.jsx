import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star, Heart, Sparkles } from 'lucide-react';
import first_pic from "../assets/images/Hide/1st_pic_z.jpg";
import lost_kid from "../assets/images/Hide/lost_kid.jpg";
import dance from "../assets/images/Hide/dance.jpg";
import BCA from "../assets/images/Hide/BCA.jpg";
import cllg_frns from "../assets/images/Hide/cllg_frns.jpg";
import red from "../assets/images/Hide/red.jpg";
import golu from "../assets/images/Hide/collage_golu.jpg";
import '../App.css';

const Timeline = () => {
  // Sample timeline data - replace with actual milestones
const milestones = [
  {
    id: 1,
    year: '2006',
    title: 'Born to Shine',
    description:
      'The world grew warmer and brighter the day you arrived. That first smile? It lit up every heart in the room.',
    image: first_pic,
    side: 'left'
  },
  {
    id: 2,
    year: '2010',
    title: 'First Day of School',
    description:
      'Tiny shoes, big dreams. You stepped into the classroom with courage — and walked out with friendships that began with your gentle heart.',
    image: lost_kid,
    side: 'right'
  },
  {
    id: 3,
    year: '2015',
    title: 'Joined Dance Class',
    description:
      'With every graceful move, the world saw the spark in you. That’s when your rhythm, spirit, and confidence truly started to shine.',
    image: dance,
    side: 'left'
  },
  {
    id: 4,
    year: '2021',
    title: 'A New Bond Begins',
    description:
      'Your heart grew bigger when your little brother arrived. You weren’t just a sister — you became his first best friend and gentle protector.',
    image: golu,
    side: 'right'
  },
  {
    id: 5,
    year: '2023',
    title: 'New Beginnings',
    description:
      'Stepping into the world of BCA with dreams in your eyes and determination in your soul. The journey of growth had truly begun.',
    image: BCA,
    side: 'left'
  },
  {
    id: 6,
    year: '2024',
    title: 'College Memories',
    description:
      'Laughter echoing in the hallways, midnight talks, and bonds that will stand the test of time — your college life began to shape your story.',
    image: cllg_frns,
    side: 'right'
  },
  {
    id: 7,
    year: '2025',
    title: 'Today & Beyond',
    description:
      'Here you are — wiser, stronger, and more radiant than ever. Today is a celebration of all you’ve become… and the beautiful journey ahead.',
    image: red,
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
      {/* Background */}
      <div className="absolute inset-0 scrapbook-paper opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
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

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="relative"
          >
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-pink-300 via-lavender-300 to-blue-300 h-full hidden md:block"></div>

            {/* Milestones */}
            <div className="space-y-12 md:space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  variants={milestoneVariants}
                  className={`relative flex items-center ${
                    milestone.side === 'left' 
                      ? 'md:flex-row-reverse md:text-right' 
                      : 'md:flex-row md:text-left'
                  } flex-col text-center`}
                >
                  {/* Content */}
                  <div className={`md:w-5/12 ${milestone.side === 'left' ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 scrapbook-shadow"
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Year Badge */}
                      <div className="inline-block bg-gradient-to-r from-pink-400 to-lavender-400 text-white px-4 py-2 rounded-full text-lg font-bold mb-4">
                        {milestone.year}
                      </div>

                      {/* Title */}
                      <h3 className="handwritten text-2xl text-gray-800 mb-3">
                        {milestone.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Decorative element */}
                      <div className="mt-4 flex justify-center md:justify-start">
                        <div className="flex gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <Heart className="w-4 h-4 text-pink-400" />
                          <Sparkles className="w-4 h-4 text-blue-400" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-pink-400 rounded-full z-10 shadow-lg">
                    <div className="w-full h-full bg-pink-400 rounded-full animate-pulse"></div>
                  </div>

                  {/* Image */}
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

                  {/* Mobile Timeline Dot */}
                  <div className="md:hidden w-4 h-4 bg-pink-400 rounded-full mt-4 mb-4"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating decorative elements */}
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

