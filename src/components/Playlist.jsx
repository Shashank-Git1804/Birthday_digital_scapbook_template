import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react';
import HBD from '../assets/audio/HBD.mp3'
import vaaste from '../assets/audio/vaaste.mp3'
import abhi_na_jao from '../assets/audio/abhi_na_jao.mp3'
import kaun_tuje from '../assets/audio/kaun_tuje.mp3'
import Justin_Bieber_Baby from '../assets/audio/Justin_Bieber_Baby.mp3'
import Te_Amo from '../assets/audio/Te_Amo.mp3'
import Zindagi_Do_Pal_Ki from '../assets/audio/Zindagi_Do_Pal_Ki.mp3'
import Arctic_Monkeys_I_Wanna_Be_Yours from '../assets/audio/Arctic_Monkeys_I_Wanna_Be_Yours.mp3'
import Ed_Sheeran_Perfect from '../assets/audio/Ed_Sheeran_-_Perfect.mp3'
import Die_With_A_Smile from '../assets/audio/Die_With_A_Smile.mp3'
import '../App.css';

const Playlist = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [durations, setDurations] = useState({});

  const audioRef = useRef(null);

  const songs = [
  {
    id: 1,
    title: 'Happy Birthday Song',
    artist: 'Mildred J. Hill & Patty Hill',
    significance: "A timeless tune — because your day deserves a little magic every year.",
    audioURL: HBD,
  },
  {
    id: 2,
    title: 'Abhi Na Jao Chhod Kar',
    artist: 'Mohammed Rafi & Asha Bhosle',
    significance: "My forever request: just stay a little longer, always.",
    audioURL: abhi_na_jao,
  },
  {
    id: 3,
    title: 'Vaaste',
    artist: 'Dhvani Bhanushali & Nikhil D’Souza',
    significance: "A melody of memories — soft, steady, unforgettable.",
    audioURL: vaaste,
  },
  {
    id: 4,
    title: 'Kaun Tujhe',
    artist: 'Palak Muchhal',
    significance: "A song we both love — because it sounds like us.",
    audioURL: kaun_tuje,
  },
  {
    id: 5,
    title: 'Baby',
    artist: 'Justin Bieber',
    significance: "The beginning of everything — silly, sweet, special.",
    audioURL: Justin_Bieber_Baby,
  },
  {
    id: 6,
    title: 'Te Amo',
    artist: 'Ash King',
    significance: "One of your favorites — and now, one of my feelings.",
    audioURL: Te_Amo,
  },
  {
    id: 7,
    title: 'Zindagi Do Pal Ki',
    artist: 'KK',
    significance: "Brief moments, deep feelings — like us, always.",
    audioURL: Zindagi_Do_Pal_Ki,
  },
  {
    id: 8,
    title: 'I Wanna Be Yours',
    artist: 'Arctic Monkeys',
    significance: "Everything I’d say, if I had the right words.",
    audioURL: Arctic_Monkeys_I_Wanna_Be_Yours,
  },
  {
    id: 9,
    title: 'Perfect',
    artist: 'Ed Sheeran',
    significance: "Feels like our story — simple, soft, and true.",
    audioURL: Ed_Sheeran_Perfect,
  },
  {
    id: 10,
    title: 'Die With A Smile',
    artist: 'Lady Gaga & Bruno Mars',
    significance: "A quiet promise — to keep smiling, always with you.",
    audioURL: Die_With_A_Smile,
  },
];


  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    const next = (currentSong + 1) % songs.length;
    setCurrentSong(next);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    const prev = (currentSong - 1 + songs.length) % songs.length;
    setCurrentSong(prev);
    setIsPlaying(true);
  };

  const handleSongSelect = (index) => {
    setCurrentSong(index);
    setIsPlaying(true);
  };

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
            href="https://open.spotify.com/playlist/1VnQXIGGs95ilOEz1xKbhy?si=DXB3-ImwTLmh4rYxR8Hwjw"
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



// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Heart } from 'lucide-react';
// import '../App.css';

// const Playlist = () => {
//   const [currentSong, setCurrentSong] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Sample playlist - replace with actual songs
//   const songs = [
//     {
//       id: 1,
//       title: 'Happy Birthday Song',
//       artist: 'Traditional',
//       duration: '0:30',
//       significance: 'The classic birthday tune!'
//     },
//     {
//       id: 2,
//       title: 'Your Favorite Song',
//       artist: 'Favorite Artist',
//       duration: '3:45',
//       significance: 'The song that always makes you smile'
//     },
//     {
//       id: 3,
//       title: 'Our Song',
//       artist: 'Special Artist',
//       duration: '4:12',
//       significance: 'Reminds us of that special moment'
//     },
//     {
//       id: 4,
//       title: 'Celebration',
//       artist: 'Kool & The Gang',
//       duration: '3:36',
//       significance: 'Perfect for dancing and celebrating!'
//     },
//     {
//       id: 5,
//       title: 'Good Vibes Only',
//       artist: 'Feel Good Artist',
//       duration: '3:28',
//       significance: 'For all the positive energy you bring'
//     }
//   ];

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleNextSong = () => {
//     setCurrentSong((prev) => (prev + 1) % songs.length);
//   };

//   const handlePrevSong = () => {
//     setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
//   };

//   const handleSongSelect = (index) => {
//     setCurrentSong(index);
//     setIsPlaying(true);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -30 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.6 }
//     }
//   };

//   return (
//     <section id="playlist" className="py-20 relative">
//       {/* Background */}
//       <div className="absolute inset-0 scrapbook-paper opacity-20"></div>
      
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <Music className="w-8 h-8 text-pink-500" />
//             <h2 className="handwritten text-responsive-lg text-gray-800">
//               Your Special Playlist
//             </h2>
//             <Music className="w-8 h-8 text-pink-500" />
//           </div>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             A curated collection of songs that remind us of you and all the 
//             wonderful moments we've shared together.
//           </p>
//         </motion.div>

//         <div className="max-w-4xl mx-auto">
//           {/* Vintage Radio Player */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="bg-gradient-to-br from-pink-100 to-lavender-100 rounded-3xl p-8 mb-8 scrapbook-shadow"
//             style={{
//               background: 'linear-gradient(135deg, #FFB6C1 0%, #E6E6FA 50%, #87CEEB 100%)'
//             }}
//           >
//             {/* Now Playing */}
//             <div className="text-center mb-6">
//               <div className="bg-white/80 rounded-2xl p-6 mb-4">
//                 <h3 className="handwritten text-2xl text-gray-800 mb-2">
//                   Now Playing
//                 </h3>
//                 <h4 className="text-xl font-semibold text-gray-700 mb-1">
//                   {songs[currentSong].title}
//                 </h4>
//                 <p className="text-gray-600 mb-2">
//                   by {songs[currentSong].artist}
//                 </p>
//                 <p className="text-sm text-pink-600 italic">
//                   {songs[currentSong].significance}
//                 </p>
//               </div>

//               {/* Controls */}
//               <div className="flex items-center justify-center gap-4">
//                 <motion.button
//                   onClick={handlePrevSong}
//                   className="bg-white/80 rounded-full p-3 hover:bg-white transition-colors"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <SkipBack className="w-6 h-6 text-gray-700" />
//                 </motion.button>

//                 <motion.button
//                   onClick={handlePlayPause}
//                   className="bg-white rounded-full p-4 hover:bg-gray-50 transition-colors shadow-lg"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   {isPlaying ? (
//                     <Pause className="w-8 h-8 text-pink-500" />
//                   ) : (
//                     <Play className="w-8 h-8 text-pink-500 ml-1" />
//                   )}
//                 </motion.button>

//                 <motion.button
//                   onClick={handleNextSong}
//                   className="bg-white/80 rounded-full p-3 hover:bg-white transition-colors"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <SkipForward className="w-6 h-6 text-gray-700" />
//                 </motion.button>
//               </div>

//               {/* Progress Bar */}
//               <div className="mt-4">
//                 <div className="bg-white/50 rounded-full h-2 overflow-hidden">
//                   <motion.div
//                     className="bg-pink-400 h-full rounded-full"
//                     initial={{ width: '0%' }}
//                     animate={{ width: isPlaying ? '60%' : '0%' }}
//                     transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
//                   />
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-600 mt-1">
//                   <span>0:00</span>
//                   <span>{songs[currentSong].duration}</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Playlist */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 scrapbook-shadow"
//           >
//             <h3 className="handwritten text-2xl text-gray-800 mb-6 text-center">
//               Complete Playlist
//             </h3>

//             <div className="space-y-3">
//               {songs.map((song, index) => (
//                 <motion.div
//                   key={song.id}
//                   variants={itemVariants}
//                   onClick={() => handleSongSelect(index)}
//                   className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
//                     currentSong === index
//                       ? 'bg-pink-100 border-2 border-pink-300'
//                       : 'bg-gray-50 hover:bg-pink-50 border-2 border-transparent'
//                   }`}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {/* Play indicator */}
//                   <div className="flex-shrink-0">
//                     {currentSong === index && isPlaying ? (
//                       <div className="w-6 h-6 flex items-center justify-center">
//                         <div className="flex gap-1">
//                           <div className="w-1 h-4 bg-pink-500 rounded-full animate-pulse"></div>
//                           <div className="w-1 h-4 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
//                           <div className="w-1 h-4 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="w-6 h-6 flex items-center justify-center text-gray-400 text-sm font-medium">
//                         {index + 1}
//                       </div>
//                     )}
//                   </div>

//                   {/* Song info */}
//                   <div className="flex-grow">
//                     <h4 className="font-medium text-gray-800">{song.title}</h4>
//                     <p className="text-sm text-gray-600">{song.artist}</p>
//                     <p className="text-xs text-pink-600 italic mt-1">{song.significance}</p>
//                   </div>

//                   {/* Duration */}
//                   <div className="flex-shrink-0 text-sm text-gray-500">
//                     {song.duration}
//                   </div>

//                   {/* Heart icon */}
//                   <Heart className="w-4 h-4 text-pink-400" />
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Spotify/YouTube Link */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.6 }}
//             className="text-center mt-8"
//           >
//             <button className="btn-pastel">
//               <Music className="w-5 h-5 mr-2" />
//               Listen on Spotify
//             </button>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Playlist;

// import React, { useState, useEffect, useRef } from 'react';
// import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db, storage } from '../firebase';
// import { Music, PlusCircle } from 'lucide-react';
// import '../App.css';

// const Playlist = () => {
//   const [songs, setSongs] = useState([]);
//   const [currentSongIndex, setCurrentSongIndex] = useState(0);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [newSong, setNewSong] = useState({
//     title: '',
//     artist: '',
//     description: '',
//     file: null,
//   });
//   const audioRef = useRef(null);

//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   const fetchSongs = async () => {
//     const snapshot = await getDocs(collection(db, 'playlist'));
//     const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     setSongs(list);
//   };

//   const handleSongEnd = () => {
//     const nextIndex = (currentSongIndex + 1) % songs.length;
//     setCurrentSongIndex(nextIndex);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (!newSong.file) return;

//     const fileRef = ref(storage, `songs/${Date.now()}_${newSong.file.name}`);
//     await uploadBytes(fileRef, newSong.file);
//     const audioURL = await getDownloadURL(fileRef);

//     await addDoc(collection(db, 'playlist'), {
//       title: newSong.title,
//       artist: newSong.artist,
//       description: newSong.description,
//       audioURL,
//       createdAt: Timestamp.now(),
//     });

//     setNewSong({ title: '', artist: '', description: '', file: null });
//     setIsFormOpen(false);
//     fetchSongs();
//   };

//   return (
//     <section id="playlist" className="py-20 bg-pink-50 relative">
//       <div className="absolute inset-0 musical-notes opacity-10"></div>
//       <div className="container mx-auto px-4 relative z-10">
//         <div className="text-center mb-12">
//           <h2 className="handwritten text-responsive-lg text-pink-600 flex justify-center items-center gap-2">
//             <Music className="w-6 h-6" />
//             Our Playlist
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Special songs from our journey together.
//           </p>
//         </div>

//         <div className="flex flex-col items-center">
//           {songs.length > 0 && (
//             <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mb-6">
//               <h3 className="text-xl font-semibold text-pink-600 mb-2">
//                 {songs[currentSongIndex]?.title} – {songs[currentSongIndex]?.artist}
//               </h3>
//               <p className="text-gray-500 mb-4">
//                 {songs[currentSongIndex]?.description}
//               </p>
//               <audio
//                 ref={audioRef}
//                 controls
//                 autoPlay
//                 onEnded={handleSongEnd}
//                 src={songs[currentSongIndex]?.audioURL}
//                 className="w-full"
//               >
//                 Your browser does not support the audio element.
//               </audio>
//             </div>
//           )}

//           <button
//             className="btn-pastel"
//             onClick={() => setIsFormOpen(true)}
//           >
//             <PlusCircle className="w-5 h-5 mr-2" />
//             Add Song
//           </button>
//         </div>

//         {/* Add Song Modal */}
//         {isFormOpen && (
//           <div
//             className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
//             onClick={() => setIsFormOpen(false)}
//           >
//             <div
//               className="bg-white p-6 rounded-lg max-w-md w-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h3 className="text-xl font-semibold mb-4">Add New Song</h3>
//               <form onSubmit={handleFormSubmit} className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Title"
//                   value={newSong.title}
//                   onChange={(e) =>
//                     setNewSong({ ...newSong, title: e.target.value })
//                   }
//                   required
//                   className="w-full border p-2 rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Artist"
//                   value={newSong.artist}
//                   onChange={(e) =>
//                     setNewSong({ ...newSong, artist: e.target.value })
//                   }
//                   required
//                   className="w-full border p-2 rounded"
//                 />
//                 <textarea
//                   placeholder="Why is this song special?"
//                   value={newSong.description}
//                   onChange={(e) =>
//                     setNewSong({ ...newSong, description: e.target.value })
//                   }
//                   className="w-full border p-2 rounded"
//                 />
//                 <input
//                   type="file"
//                   accept="audio/*"
//                   onChange={(e) =>
//                     setNewSong({ ...newSong, file: e.target.files[0] })
//                   }
//                   required
//                   className="w-full border p-2 rounded"
//                 />
//                 <div className="flex justify-end gap-2">
//                   <button
//                     type="button"
//                     onClick={() => setIsFormOpen(false)}
//                     className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Playlist;

