import { useEffect, useState } from 'react';
import { getTracks, deleteTrack} from '../services/trackService';
import TrackForm from './TrackForm'; 
import './TrackList.css'; 

const TrackList = ({ onPlay, onAdd, onUpdate }) => {
  const [tracks, setTracks] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);  
  const [trackToEdit, setTrackToEdit] = useState(null);  

  useEffect(() => {
    const fetchTracks = async () => {
      const data = await getTracks();
      setTracks(data);
    };

    fetchTracks();
  }, []);

  const handleDelete = async (trackId) => {
    await deleteTrack(trackId);
    setTracks(tracks.filter(track => track._id !== trackId)); // Remove track from list
  };

  // Handle adding a track
  const handleAddTrack = async (newTrack) => {
    await onAdd(newTrack);  // Call the addTrack API
    setFormVisible(false);  // Hide form after submission
    const data = await getTracks(); // Refetch tracks from backend
    setTracks(data);  // Update state with new track list
  };

  // Handle updating a track
  const handleUpdateTrack = async (updatedTrack) => {
    await onUpdate(updatedTrack);  // Call the updateTrack API
    setFormVisible(false);  // Hide form after submission
    const data = await getTracks(); // Refetch tracks from backend
    setTracks(data);  // Update state with updated track list
  };

  return (
    <div className="track-list">
      <button onClick={() => { setTrackToEdit(null); setFormVisible(true); }}>
        Add New Track
      </button>

      {isFormVisible && (
        <TrackForm
        selected={trackToEdit}  
          trackToEdit={trackToEdit}
          onFormSubmit={trackToEdit ? handleUpdateTrack : handleAddTrack} 
        />
      )}

      <h2>Track List</h2>
      <div className="track-cards">
        {tracks.map((track) => (
          <div key={track._id} className="track-card">
            <h3>{track.title} by {track.artist}</h3>
            <div className="card-buttons">
              <button onClick={() => onPlay(track)}>Play</button>
              <button onClick={() => { setTrackToEdit(track); setFormVisible(true); }}>
                Edit
              </button>
              <button onClick={() => handleDelete(track._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList;
