import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react';
import HBD from '../assets/audio/HBD.mp3'; // **TODO: Replace with your own local audio file if needed**
import '../App.css';

const Playlist = () => {
  // **STATE HOOKS**
  const [currentSong, setCurrentSong] = useState(0); // **Keeps track of the currently playing song**
  const [isPlaying, setIsPlaying] = useState(false); // **Playback state (playing/paused)**
  const [currentTime, setCurrentTime] = useState(0); // **Current time position of the audio**
  const [duration, setDuration] = useState(0); // **Total length of the current audio**
  const [durations, setDurations] = useState({}); // **Stores durations for all songs**

  // **REFERENCE HOOK**
  const audioRef = useRef(null); // **Reference to the <audio> element for direct control**

  // **TODO: Change songs list with your own playlist details**
  const songs = [
    {
      id: 1,
      title: 'Happy Birthday Song', // **TODO: Change song title**
      artist: 'Mildred J. Hill & Patty Hill', // **TODO: Change artist name**
      significance: "A timeless tune — because your day deserves a little magic every year.", // **TODO: Update description**
      audioURL: HBD, // **Local file**
    },
    {
      id: 2,
      title: 'City Lights',
      artist: 'Urban Strings',
      significance: "Captures the pulse of the evening streets.",
      audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // **TODO: Replace with your song URL**
    },
    {
      id: 3,
      title: 'Ocean Drive',
      artist: 'Wave Riders',
      significance: "Calm waves and endless horizons.",
      audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: 4,
      title: 'Golden Hour',
      artist: 'Sunset Collective',
      significance: "A warm and gentle close to the day.",
      audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      id: 5,
      title: 'Neon Nights',
      artist: 'Electro Flow',
      significance: "Bright lights and unstoppable energy.",
      audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
    {
      id: 6,
      title: 'Moonlit Walk',
      artist: 'Lunar Notes',
      significance: "Quiet, reflective, and full of wonder.",
      audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
    {
      id: 7,
      title: 'Whispered Stories',
      artist: 'Storyteller Duo',
      significance: "Gentle words wrapped in melody.",
      audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    },
    {
      id: 8,
      title: 'Skyline Dreams',
      artist: 'Midnight Travelers',
      significance: "An anthem for those chasing horizons.",
      audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    },
    {
      id: 9,
      title: 'Falling Leaves',
      artist: 'Autumn Quartet',
      significance: "Crisp air and changing colors.",
      audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    },
    {
      id: 10,
      title: 'Starlight Serenade',
      artist: 'Celestial Voices',
      significance: "A promise sung under the night sky.",
      audioURL: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    },
  ];

  // **FUNCTION: Format time (mm:ss)**
  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // **PLAY/PAUSE FUNCTION**
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // **SKIP TO NEXT SONG**
  const handleNextSong = () => {
    const next = (currentSong + 1) % songs.length; // **Loops back to first song**
    setCurrentSong(next);
    setIsPlaying(true);
  };

  // **SKIP TO PREVIOUS SONG**
  const handlePrevSong = () => {
    const prev = (currentSong - 1 + songs.length) % songs.length; // **Wraps around to last song**
    setCurrentSong(prev);
    setIsPlaying(true);
  };

  // **SELECT SONG FROM LIST**
  const handleSongSelect = (index) => {
    setCurrentSong(index);
    setIsPlaying(true);
  };

  // **SEEK BAR CLICK HANDLER**
  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  // **AUDIO EVENTS**
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const onLoadedMetadata = () => {
        setDuration(audio.duration);
        setDurations((prev) => ({ ...prev, [currentSong]: audio.duration }));
      };
      const onTimeUpdate = () => setCurrentTime(audio.currentTime);
      const onEnded = () => handleNextSong();

      audio.addEventListener('loadedmetadata', onLoadedMetadata);
      audio.addEventListener('timeupdate', onTimeUpdate);
      audio.addEventListener('ended', onEnded);

      if (isPlaying) {
        audio.play();
      }

      return () => {
        audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        audio.removeEventListener('timeupdate', onTimeUpdate);
        audio.removeEventListener('ended', onEnded);
      };
    }
  }, [currentSong, isPlaying]);

  return (
    <section id="playlist" className="py-20 relative">
      <div className="absolute inset-0 scrapbook-paper opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-8 h-8 text-pink-500" />
            <h2 className="handwritten text-responsive-lg text-gray-800">
              Your Special Playlist
            </h2>
            <Music className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A curated collection of songs that remind us of you and all the 
            wonderful moments we've shared together.
          </p>
        </motion.div>

        {/* AUDIO ELEMENT */}
        <audio ref={audioRef} src={songs[currentSong].audioURL} preload="metadata" />

        {/* Player UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-pink-100 to-lavender-100 rounded-3xl p-8 mb-8 scrapbook-shadow"
        >
          <div className="text-center mb-6">
            <div className="bg-white/80 rounded-2xl p-6 mb-4">
              <h3 className="handwritten text-2xl text-gray-800 mb-2">Now Playing</h3>
              <h4 className="text-xl font-semibold text-gray-700 mb-1">{songs[currentSong].title}</h4>
              <p className="text-gray-600 mb-2">by {songs[currentSong].artist}</p>
              <p className="text-sm text-pink-600 italic">{songs[currentSong].significance}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <motion.button onClick={handlePrevSong} className="bg-white/80 rounded-full p-3 hover:bg-white transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SkipBack className="w-6 h-6 text-gray-700" />
              </motion.button>

              <motion.button onClick={handlePlayPause} className="bg-white rounded-full p-4 hover:bg-gray-50 transition-colors shadow-lg" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {isPlaying ? <Pause className="w-8 h-8 text-pink-500" /> : <Play className="w-8 h-8 text-pink-500 ml-1" />}
              </motion.button>

              <motion.button onClick={handleNextSong} className="bg-white/80 rounded-full p-3 hover:bg-white transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SkipForward className="w-6 h-6 text-gray-700" />
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="bg-white/50 rounded-full h-2 relative cursor-pointer" onClick={handleSeek}>
                <div
                  className="bg-pink-400 h-full rounded-full absolute top-0 left-0 transition-all duration-200"
                  style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                />
                <div
                  className="absolute top-3/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full shadow transition-transform duration-200"
                  style={{
                    left: duration ? `${(currentTime / duration) * 100}%` : '0%',
                    transform: 'translate(-50%, -50%)',
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Playlist Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 scrapbook-shadow"
        >
          <h3 className="handwritten text-2xl text-gray-800 mb-6 text-center">Complete Playlist</h3>
          <div className="space-y-3">
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                onClick={() => handleSongSelect(index)}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  currentSong === index ? 'bg-pink-100 border-2 border-pink-300' : 'bg-gray-50 hover:bg-pink-50 border-2 border-transparent'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-shrink-0">
                  {currentSong === index && isPlaying ? (
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-pink-500 rounded-full animate-pulse"></div>
                        <div className="w-1 h-4 bg-pink-500 rounded-full animate-pulse delay-200"></div>
                        <div className="w-1 h-4 bg-pink-500 rounded-full animate-pulse delay-400"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 flex items-center justify-center text-gray-400 text-sm font-medium">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-800">{song.title}</h4>
                  <p className="text-sm text-gray-600">{song.artist}</p>
                  <p className="text-xs text-pink-600 italic mt-1">{song.significance}</p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500">
                  {durations[index] ? formatTime(durations[index]) : '...'}
                </div>
                <Heart className="w-4 h-4 text-pink-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Spotify Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-8"
        >
          <a
          //TODO - change spotify link of your own 
            href="https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pastel inline-flex items-center"
          >
            <Music className="w-5 h-5 mr-2" />
            Listen on Spotify
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Playlist;

