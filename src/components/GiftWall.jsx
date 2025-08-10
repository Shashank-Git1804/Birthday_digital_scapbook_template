import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Plus,
  X,
  Heart,
  Star,
  Sparkles,
  ExternalLink,
  Undo,
  Trash,
} from "lucide-react";
import "../App.css";

/** 
 * **GiftWall Component**
 * This section displays a **virtual gift wall** where users can pin gifts, poems, messages, links, and images.
 * Gifts are stored in `localStorage` so they persist between page reloads.
 */

const GiftWall = () => {
  /** 
   * **TODO:** Customize the default placeholder gifts below.
   * You can replace image URLs, titles, messages, sender names, and colors.
   */
  const staticGifts = [
    {
      id: 1,
      type: "image",
      title: "Image Placeholder", // **TODO:** Change to your own gift image title
      content: "https://via.placeholder.com/300x200.png?text=Image+Placeholder", // **TODO:** Replace with your image URL
      sender: "Sender Name", // **TODO:** Replace with sender name
      message: "A short description of the image or why it’s shared.", // **TODO:** Customize description
      pinColor: "bg-pink-400", // **TODO:** Change pin color if desired
      static: true,
    },
    {
      id: 2,
      type: "poem",
      title: "Poem Placeholder", // **TODO:** Replace with custom poem title
      content:
        "Line 1 of a poem goes here.\nLine 2 continues the theme.\nLine 3 adds a thought or feeling.\nLine 4 wraps it with meaning.", // **TODO:** Replace with your poem
      sender: "Sender Name",
      message: "Optional message from the sender.",
      pinColor: "bg-yellow-400",
      static: true,
    },
    {
      id: 3,
      type: "image",
      title: "Artwork or Photo Placeholder",
      content: "https://via.placeholder.com/300x200.png?text=Artwork+Placeholder",
      sender: "Sender Name",
      message: "Brief caption or context for this artwork or photo.",
      pinColor: "bg-green-400",
      static: true,
    },
    {
      id: 4,
      type: "link",
      title: "Link Placeholder", // **TODO:** Replace with your own link
      content: "https://example.com",
      sender: "Sender Name",
      message: "Short note about the link being shared.",
      pinColor: "bg-blue-400",
      static: true,
    },
  ];

  // **State hooks**
  const [gifts, setGifts] = useState([]);
  const [undoGift, setUndoGift] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGift, setNewGift] = useState({
    type: "message", // default gift type
    title: "",
    content: "",
    sender: "",
    message: "",
  });

  // **Available pin colors for variety**
  const pinColors = [
    "bg-pink-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-purple-400",
    "bg-orange-400",
  ];

  /** **On component mount:** load gifts from localStorage and merge with static placeholders */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("giftWall") || "[]");
    setGifts([...staticGifts, ...stored]);
  }, []);

  /** Save dynamic gifts to localStorage */
  const persistGifts = (giftList) => {
    const dynamicGifts = giftList.filter((g) => !g.static);
    localStorage.setItem("giftWall", JSON.stringify(dynamicGifts));
  };

  /** Add a new gift to the wall */
  const handleAddGift = (e) => {
    e.preventDefault();
    if (!newGift.title || !newGift.content || !newGift.sender) return;

    const gift = {
      id: Date.now(),
      ...newGift,
      pinColor: pinColors[Math.floor(Math.random() * pinColors.length)],
      static: false,
    };

    const updated = [...gifts, gift];
    setGifts(updated);
    persistGifts(updated);

    // Reset form
    setNewGift({
      type: "message",
      title: "",
      content: "",
      sender: "",
      message: "",
    });
    setShowAddForm(false);
  };

  /** Delete a gift (only if not static) and allow undo */
  const handleDelete = (id) => {
    const toDelete = gifts.find((g) => g.id === id);
    if (!toDelete || toDelete.static) return;

    setUndoGift(toDelete);
    const updated = gifts.filter((g) => g.id !== id);
    setGifts(updated);
    persistGifts(updated);

    // Remove undo option after 5 seconds
    setTimeout(() => {
      setUndoGift(null);
    }, 5000);
  };

  /** Restore deleted gift */
  const handleUndo = () => {
    if (!undoGift) return;
    const updated = [...gifts, undoGift];
    setGifts(updated);
    persistGifts(updated);
    setUndoGift(null);
  };

  /** Render gift content based on type */
  const renderGiftContent = (gift) => {
    const scrollableStyle =
      "bg-white/80 p-3 rounded mb-3 text-sm whitespace-pre-line max-h-40 overflow-y-auto custom-scroll";

    switch (gift.type) {
      case "image":
      case "meme":
        return (
          <img
            src={gift.content}
            alt={gift.title}
            className="w-full h-42 object-cover rounded mb-3"
          />
        );
      case "poem":
      case "message":
      case "gift":
        return <div className={scrollableStyle}>{gift.content}</div>;
      case "link":
        return (
          <div className={scrollableStyle}>
            <div className="flex items-center gap-2 h-30">
              <ExternalLink className="w-4 h-4 text-blue-500 shrink-0" />
              <a
                href={gift.content}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 break-all"
              >
                {gift.content}
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 relative" id="gifts">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <Gift className="w-8 h-8 inline-block text-pink-500" />
          <h2 className="handwritten text-3xl">Virtual Gift Wall</h2>
        </div>

        {/* Button to open form */}
        <div className="text-center mb-8">
          <motion.button
            onClick={() => setShowAddForm(true)}
            className="btn-pastel inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Pin a Gift
          </motion.button>
        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gifts.map((gift) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white rounded-lg p-4 shadow"
            >
              {/* Pin Indicator */}
              <div
                className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 ${gift.pinColor} rounded-full`}
              >
                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
              </div>

              {/* Gift type + action icons */}
              <div className="flex justify-between mb-2">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
                  {gift.type}
                </span>
                <div className="flex items-center gap-1">
                  {gift.type === "poem" && <Star className="w-3 h-3 text-yellow-400" />}
                  {gift.type === "image" && <Heart className="w-3 h-3 text-pink-400" />}
                  {gift.type === "gift" && <Sparkles className="w-3 h-3 text-purple-400" />}
                  {!gift.static && (
                    <button
                      onClick={() => handleDelete(gift.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Gift content */}
              <h3 className="text-md font-semibold mb-2">{gift.title}</h3>
              {renderGiftContent(gift)}
              <p className="text-sm font-medium text-gray-700">
                From: {gift.sender}
              </p>
              {gift.message && (
                <p className="text-xs text-gray-600 italic">"{gift.message}"</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Undo Toast */}
        <AnimatePresence>
          {undoGift && (
            <motion.div
              key="undo-toast"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 bg-yellow-100 border border-yellow-300 px-5 py-3 rounded-lg shadow-xl text-yellow-800"
              >
                <Undo className="w-4 h-4" />
                <span className="text-sm font-medium">Gift deleted</span>
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

        {/* Add Gift Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
              onClick={() => setShowAddForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="handwritten text-xl">Pin a Gift</h3>
                  <button onClick={() => setShowAddForm(false)}>
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>

                {/* Add Gift Form */}
                <form onSubmit={handleAddGift} className="space-y-4">
                  <select
                    value={newGift.type}
                    onChange={(e) =>
                      setNewGift({ ...newGift, type: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="message">Message</option>
                    <option value="poem">Poem</option>
                    <option value="link">Link</option>
                    <option value="gift">Gift</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Title"
                    value={newGift.title}
                    onChange={(e) =>
                      setNewGift({ ...newGift, title: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <textarea
                    placeholder="Content"
                    rows={3}
                    value={newGift.content}
                    onChange={(e) =>
                      setNewGift({ ...newGift, content: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newGift.sender}
                    onChange={(e) =>
                      setNewGift({ ...newGift, sender: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Optional Message"
                    value={newGift.message}
                    onChange={(e) =>
                      setNewGift({ ...newGift, message: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 border p-2 rounded"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 btn-pastel">
                      Pin Gift
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GiftWall;
