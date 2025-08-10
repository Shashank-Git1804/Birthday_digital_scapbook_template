import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Heart,
  Star,
  Trash2,
  RotateCcw
} from 'lucide-react';
import '../App.css';

// **Utility Function** → Converts a given date string to "x min ago" format
function getRelativeTimeFromDate(dateString, now = new Date()) {
  const created = new Date(dateString);
  const diffMs = now - created;
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  return created.toLocaleDateString();
}

const Guestbook = () => {
  // **Default preloaded birthday wishes**  
  // TODO: Change messages/names if you want your own default wishes.
  const defaultMessages = [
    {
      id: 1,
      name: 'Alex',
      message: 'Wishing you a wonderful day filled with joy, laughter, and all your favorite things! 🎉',
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 min ago
      color: 'bg-yellow-100',
      isDefault: true
    },
    {
      id: 2,
      name: 'Jamie',
      message: 'Happy celebrations! Here’s to another amazing year ahead. 🥳',
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      color: 'bg-pink-100',
      isDefault: true
    },
    {
      id: 3,
      name: 'Taylor',
      message: 'May this day be as bright and special as you are. ✨',
      createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      color: 'bg-blue-100',
      isDefault: true
    },
    {
      id: 4,
      name: 'Riley',
      message: 'Here’s to unforgettable memories and new adventures! 🌟',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      color: 'bg-green-100',
      isDefault: true
    },
    {
      id: 5,
      name: 'Jordan',
      message: 'Wishing you endless smiles and warm moments today. 💛',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      color: 'bg-purple-100',
      isDefault: true
    },
    {
      id: 6,
      name: 'Casey',
      message: 'Hope your day is filled with love, laughter, and cake! 🎂',
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      color: 'bg-orange-100',
      isDefault: true
    }
  ];

  // **Sticky note background color pool**  
  // TODO: Add/remove colors if you want a different palette.
  const stickyNoteColors = [
    'bg-yellow-100',
    'bg-pink-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-purple-100',
    'bg-orange-100'
  ];

  // **State hooks** → stores messages, inputs, deleted item for undo, and current time
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newName, setNewName] = useState('');
  const [lastDeleted, setLastDeleted] = useState(null);
  const [now, setNow] = useState(new Date());

  // **Update "x min ago" clock every 60 seconds**
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // **Load messages from localStorage + merge with defaults**
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('birthdayMessages'));
      if (stored && stored.length > 0) {
        setMessages([...defaultMessages, ...stored]);
      } else {
        setMessages([...defaultMessages]);
      }
    } catch (err) {
      console.error('Storage error:', err);
      setMessages([...defaultMessages]);
    }
  }, []);

  // **Helper** → Saves only user-added messages (not defaults) into localStorage
  const saveToStorage = (msgList) => {
    const userOnly = msgList.filter((m) => !m.isDefault);
    localStorage.setItem('birthdayMessages', JSON.stringify(userOnly));
  };

  // **Handles new message submission**
  // TODO: Adjust guestbook size limit if needed.
  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessages = messages.filter((m) => !m.isDefault);
    if (userMessages.length >= 14) {
      alert('Guestbook full! You can only submit up to 14 user wishes.');
      return;
    }

    if (newMessage.trim() && newName.trim()) {
      const newMsg = {
        id: Date.now(),
        name: newName.trim(),
        message: newMessage.trim(),
        createdAt: new Date().toISOString(),
        color: stickyNoteColors[Math.floor(Math.random() * stickyNoteColors.length)],
        isDefault: false
      };
      const updated = [newMsg, ...messages];
      setMessages(updated);
      saveToStorage(updated);
      setNewName('');
      setNewMessage('');
    }
  };

  // **Deletes a message** (only if it's user-added)
  const handleDelete = (id) => {
    const toDelete = messages.find((m) => m.id === id);
    if (!toDelete || toDelete.isDefault) return;
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    setLastDeleted(toDelete);
    saveToStorage(updated);
    setTimeout(() => setLastDeleted(null), 5000); // Auto-clear undo after 5s
  };

  // **Restores last deleted message**
  const handleUndo = () => {
    if (!lastDeleted) return;
    const updated = [lastDeleted, ...messages];
    setMessages(updated);
    saveToStorage(updated);
    setLastDeleted(null);
  };

  // **Framer Motion animation variants**
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: Math.random() * 6 - 3,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="guestbook" className="py-20 relative">
      {/* **Background scrapbook texture** */}
      <div className="absolute inset-0 scrapbook-paper opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        
        {/* **Header Section** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-pink-500" />
            <h2 className="handwritten text-responsive-lg text-gray-800">
              Birthday Wishes
            </h2>
            <MessageCircle className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leave a special message for the birthday star! Your words will be treasured forever.
          </p>
        </motion.div>

        {/* **Form Section** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-12 scrapbook-shadow"
        >
          <h3 className="handwritten text-2xl text-gray-800 mb-6 text-center">
            Share Your Birthday Wishes
          </h3>

          {/* **Limit warning** */}
          {messages.filter((m) => !m.isDefault).length >= 14 && (
            <div className="text-center text-red-500 font-semibold mb-4">
              🎈 Guestbook limit reached (20 total). Only 14 user wishes allowed.
            </div>
          )}

          {/* **Input Fields** */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300"
                  placeholder="Enter your name"
                  disabled={messages.filter((m) => !m.isDefault).length >= 14}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 resize-none"
                  placeholder="Write your birthday message..."
                  disabled={messages.filter((m) => !m.isDefault).length >= 14}
                  required
                />
              </div>
            </div>

            {/* **Submit Button** */}
            <div className="text-center">
              <motion.button
                type="submit"
                className="btn-pastel inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={messages.filter((m) => !m.isDefault).length >= 14}
              >
                <Send className="w-5 h-5" />
                Send Birthday Wishes
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* **Undo Toast Notification** */}
        <AnimatePresence>
          {lastDeleted && (
            <motion.div
              key="undo-toast"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
            >
              <motion.div className="flex items-center gap-3 bg-yellow-100 border border-yellow-300 px-5 py-3 rounded-lg shadow-xl text-yellow-800">
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Message deleted</span>
                <button
                  onClick={handleUndo}
                  className="ml-3 px-3 py-1 bg-yellow-300 hover:bg-yellow-400 rounded text-sm font-semibold"
                >
                  Undo
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* **Message Wall Section** */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                className={`${message.color} p-6 rounded-lg shadow-lg relative`}
              >
                {/* **Message text** */}
                <div className="mb-4">
                  <p className="text-gray-800 leading-relaxed font-semibold">
                    "{message.message}"
                  </p>
                </div>

                {/* **Author + Actions** */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-700">{message.name}</p>
                    <p className="text-sm text-gray-500">
                      {getRelativeTimeFromDate(message.createdAt, now)}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    {!message.isDefault && (
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="text-red-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <Heart className="w-4 h-4 text-pink-400" />
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>

                {/* **Top decoration tab** */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-white/70 border border-gray-200 rounded-sm"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Guestbook;
