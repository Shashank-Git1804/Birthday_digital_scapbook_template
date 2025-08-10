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
  const [isScrolled, setIsScrolled] = useState(false); // **Tracks whether the user has scrolled**
  const [menuOpen, setMenuOpen] = useState(false); // **Tracks mobile menu open/close state**

  // **Detect scroll to change header background style**
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // **Scroll smoothly to a section by ID**
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // **Close mobile menu when navigating**
    } else {
      console.warn(`Element with id="${sectionId}" not found.`);
    }
  };

  // **📝 Navigation items list**
  // **TODO: Change 'label' for display text and 'id' to match your actual section IDs**
  // **TODO: Add/remove items if you want more or fewer navigation links**
  const navItems = [
    { id: 'hero', label: 'Home', icon: Heart }, // **TODO: Change 'Home' to your preferred label**
    { id: 'gallery', label: 'Photos', icon: Camera },
    { id: 'videos', label: 'Videos', icon: Calendar },
    { id: 'playlist', label: 'Music', icon: Music },
    { id: 'guestbook', label: 'Wishes', icon: MessageCircle },
    { id: 'gifts', label: 'Gifts', icon: Gift },
  ];

  return (
    <motion.header
      // **Header styling**
      // **TODO: Change background colors, shadows, or blur here**
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 bg-pink/80 backdrop-blur-md shadow-lg${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* **🎉 Site title** */}
          {/* **TODO: Replace "(Name)" with the actual birthday person's name** */}
          <motion.div
            className="handwritten text-2xl md:text-3xl text-pink-600 font-bold"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('hero')}
          >
            (Name)'s Birthday
          </motion.div>

          {/* **💻 Desktop Navigation (visible on large screens)** */}
          {/* **TODO: Update icons or labels if needed** */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-700 hover:text-pink-600 transition font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
              </motion.button>
            ))}
          </nav>

          {/* **📱 Mobile Hamburger Menu Button** */}
          {/* **TODO: Change button color/background if you want a different theme** */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-full bg-pink-100 text-pink-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* **📱 Mobile Menu (slides down when hamburger clicked)** */}
        {/* **TODO: Change layout (grid/column) if you want a different style for mobile menu** */}
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
                  className="flex items-center gap-1 px-3 py-2 rounded-full bg-pink-50 text-pink-600 text-sm font-bold"
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
