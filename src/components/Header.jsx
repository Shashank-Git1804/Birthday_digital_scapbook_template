import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Heart,
  Camera,
  Music,
  MessageCircle,
  Gift,
  Menu,
  X,
} from 'lucide-react';
import '../App.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    } else {
      console.warn(`Element with id="${sectionId}" not found.`);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: Heart },
    { id: 'gallery', label: 'Photos', icon: Camera },
    { id: 'videos', label: 'Videos', icon: Calendar },
    { id: 'playlist', label: 'Music', icon: Music },
    { id: 'guestbook', label: 'Wishes', icon: MessageCircle },
    { id: 'gifts', label: 'Gifts', icon: Gift },
  ];

  return (
    <motion.header
    className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 bg-pink/80 backdrop-blur-md shadow-lg${
    isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
  }`}
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6 }}
>
     
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="handwritten text-2xl md:text-3xl text-pink-600"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('hero')}
          >
            Mahalakshmi's Birthday
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-700 hover:text-pink-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-full bg-pink-100 text-pink-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="lg:hidden mt-4 grid grid-cols-2 gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="flex items-center gap-1 px-3 py-2 rounded-full bg-pink-50 text-pink-600 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </motion.button>
              ))}
              
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
