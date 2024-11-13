import './App.css'
import { useState, useEffect } from 'react';
// Services
import * as trackService from './services/trackService';

// Components
import TrackList from './components/TrackList';
import NowPlaying from './components/NowPlaying';

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  const handlePlay = (track) => {
    setCurrentTrack(track);
  };

  const handleAddTrack = async (newTrack) => {
    await trackService.addTrack(newTrack);
  };

  const handleUpdateTrack = async (updatedTrack) => {
    await trackService.updateTrack(updatedTrack);
  };

  return (
    <div>
  
      <TrackList
        onPlay={handlePlay}
        onAdd={handleAddTrack}  // Pass the add function to TrackList
        onUpdate={handleUpdateTrack}  // Pass the update function to TrackList
      />
      
      <NowPlaying track={currentTrack} />
    </div>
  );
};

export default App;
