import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Video, Heart, Maximize, Volume2, VolumeX } from 'lucide-react';

// **TODO: Uncomment and replace with your own video imports if you want actual video files**
//import vdo_name from '../assets/videos/vdo_name.mp4';

// **TODO: Replace these image imports with your own thumbnail images if needed**
import dad_tb from '../assets/images/Hide/dad_tb.jpg';
import mom_tb from '../assets/images/Hide/mom_tb.jpg';
import sis_tb from '../assets/images/Hide/sis_tb.jpg';
import bro_tb from '../assets/images/Hide/bro_tb.jpg';
import bff_tb from '../assets/images/Hide/bff_tb.jpg';
import friends_tb from '../assets/images/Hide/friends_tb.jpg';
import bestie_tb from '../assets/images/Hide/bestie_tb.jpg';

import '../App.css';

const VideoMessages = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [generatedThumbnails, setGeneratedThumbnails] = useState({});
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRefs = useRef({});
  const inactivityTimer = useRef(null);

  // **TODO: Customize video list — add your own titles, thumbnails, and messages**
  const videos = [ 
    {
      id: 1,
      title: 'Birthday Wish from a Loving Parent', // **TODO: Change title**
      thumbnail: dad_tb, // **TODO: Change thumbnail image**
      //videoUrl: vdo_name, // **TODO: Add video file URL or leave null for thumbnail only**
      sender: 'Parent', // **TODO: Change sender name**
      message: 'Happy Birthday! We are so proud of the amazing person you are becoming. 💝' // **TODO: Change message**
    },
    {
      id: 2,
      title: 'Birthday Wish from Mom',
      thumbnail: mom_tb,
      videoUrl: null,
      sender: 'Mom',
      message: 'Wishing you the happiest birthday ever! You are loved beyond words. 💖'
    },
    {
      id: 3,
      title: 'Birthday Wish from a Sibling',
      thumbnail: sis_tb,
      videoUrl: null,
      sender: 'Sibling',
      message: 'Happy Birthday! You’ll always be my favorite partner in fun and laughter. 💟'
    },
    {
      id: 4,
      title: 'Birthday Wish from a Brother',  
      thumbnail: bro_tb,
      videoUrl: null,
      sender: 'Brother',
      message: 'Happy Birthday! May your day be filled with joy and sweet memories. 🎂💛'
    },
    {
      id: 5,
      title: 'Birthday Wish from a Best Friend',
      thumbnail: bff_tb,
      videoUrl: null,
      sender: 'Best Friend',
      message: 'Happy Birthday! From the first time we met till now — your smile still shines just as bright. 💃✨'
    },
    {
      id: 6,
      title: 'Birthday Wish from a Friend',  
      thumbnail: friends_tb,
      videoUrl: null,
      sender: 'Friends',
      message: 'Happy Birthday! Life is always more fun with friends like you. 😄💕'
    },
    // **TODO: Example of adding a new video**
    // {
    //   id: 7,
    //   title: 'Childhood Memories',
    //   thumbnail: null,
    //   videoUrl: v1,
    //   sender: 'Sarah',
    //   message: 'Those silly childhood moments with you still live rent-free in my heart! ❤️'
    // }
  ];

  // **Generate thumbnails automatically for videos without one**
  useEffect(() => {
    videos.forEach(video => {
      if (!video.thumbnail && !generatedThumbnails[video.id]) {
        generateThumbnail(video);
      }
    });
  }, []);

  // **Auto-hide controls after inactivity**
  useEffect(() => {
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [playingVideo]);

  // **Generate video preview thumbnail**
  const generateThumbnail = (video) => {
    const videoElement = document.createElement('video');
    videoElement.src = video.videoUrl;
    videoElement.crossOrigin = 'anonymous';
    videoElement.currentTime = 1;

    videoElement.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');

      setGeneratedThumbnails(prev => ({ ...prev, [video.id]: dataURL }));
    });
  };

  // **Play/Pause video**
  const handlePlayPause = (id) => {
    if (playingVideo === id) {
      videoRefs.current[id].pause();
      setPlayingVideo(null);
    } else {
      if (playingVideo && videoRefs.current[playingVideo]) {
        videoRefs.current[playingVideo].pause();
      }
      videoRefs.current[id].play();
      setPlayingVideo(id);
    }
  };

  // **Mute/Unmute video**
  const handleMuteToggle = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const videoVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section id="videos" className="py-20 relative">
      {/* **Background paper effect** */}
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
            <Video className="w-8 h-8 text-pink-500" />
            <h2 className="handwritten text-responsive-lg text-gray-800">Video Messages</h2>
            <Video className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Heartfelt video messages from your loved ones, captured just for you.
          </p>
        </motion.div>

        {/* **Video Grid** */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {videos.map(video => (
            <motion.div
              key={video.id}
              variants={videoVariants}
              className="group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="polaroid-frame scrapbook-shadow bg-white">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  
                  {/* **Video element** */}
                  <video
                    ref={el => videoRefs.current[video.id] = el}
                    src={video.videoUrl}
                    className="w-full h-48 object-contain"
                    onEnded={() => setPlayingVideo(null)}
                    onPause={() => setPlayingVideo(null)}
                    style={{ display: playingVideo === video.id ? 'block' : 'none' }}
                    controls={false}
                    muted={isMuted}
                  />

                  {/* **Thumbnail + Play button** */}
                  {playingVideo !== video.id && (
                    <>
                      <img
                        src={video.thumbnail || generatedThumbnails[video.id]}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <motion.button
                          onClick={() => handlePlayPause(video.id)}
                          className="bg-white/90 rounded-full p-4 shadow-lg hover:bg-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="w-8 h-8 text-pink-500 ml-1" />
                        </motion.button>
                      </div>
                    </>
                  )}

                  {/* **Custom Controls when playing** */}
                  {playingVideo === video.id && showControls && (
                    <div className="absolute inset-0 p-4 flex justify-between items-end pointer-events-none">
                      
                      {/* Bottom-left: Volume */}
                      <div className="pointer-events-auto">
                        {isMobile ? (
                          <motion.button
                            onClick={() => handleMuteToggle(video.id)}
                            className="bg-white/80 rounded-full p-3"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {isMuted ? (
                              <VolumeX className="w-5 h-5 text-pink-600" />
                            ) : (
                              <Volume2 className="w-5 h-5 text-pink-600" />
                            )}
                          </motion.button>
                        ) : (
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            defaultValue="1"
                            onChange={(e) => {
                              const v = videoRefs.current[video.id];
                              if (v) v.volume = parseFloat(e.target.value);
                            }}
                            className="w-24"
                          />
                        )}
                      </div>

                      {/* Bottom-right: Pause + Fullscreen */}
                      <div className="flex flex-col items-end space-y-2 pointer-events-auto">
                        <motion.button
                          onClick={() => handlePlayPause(video.id)}
                          className="bg-white/80 rounded-full p-3"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Pause className="w-6 h-6 text-pink-600" />
                        </motion.button>

                        <motion.button
                          onClick={() => {
                            const v = videoRefs.current[video.id];
                            if (v.requestFullscreen) v.requestFullscreen();
                            else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
                            else if (v.msRequestFullscreen) v.msRequestFullscreen();
                          }}
                          className="bg-white/80 rounded-full p-3"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Maximize className="w-5 h-5 text-pink-600" />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>

                {/* **Video title, sender, message** */}
                <div className="text-center">
                  <h3 className="handwritten text-xl text-gray-800 mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    From: <span className="font-medium text-pink-600">{video.sender}</span>
                  </p>
                  <p className="text-sm text-gray-500 italic">"{video.message}"</p>
                </div>

                <div className="tape-effect"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* **Floating decorative hearts** */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 2) * 40}%` }}
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Heart className="w-4 h-4 text-pink-300 opacity-40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoMessages;

