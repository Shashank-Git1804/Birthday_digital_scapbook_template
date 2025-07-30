import React, { useState } from 'react';
import EntryExperience from './components/EntryExperience';
import Header from './components/Header';
import Hero from './components/Hero';
import PhotoGallery from './components/PhotoGallery';
import VideoMessages from './components/VideoMessages';
import Playlist from './components/Playlist';
import Timeline from './components/Timeline';
import Guestbook from './components/Guestbook';
import GiftWall from './components/GiftWall';
import './App.css';

function App() {
  const [showEntry, setShowEntry] = useState(true);

  const handleEnterSite = () => {
    setShowEntry(false);
  };

  return (
    <div className="min-h-screen">
      {showEntry ? (
        <EntryExperience onEnter={handleEnterSite} />
      ) : (
        <>
          <Header />
          <main>
            <Hero />
            <PhotoGallery />
            <VideoMessages />
            <Playlist />
            <Timeline />
            <Guestbook />
            <GiftWall />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
