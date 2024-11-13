import { useState, useEffect } from 'react';
import { addTrack, updateTrack } from '../services/trackService';  

const TrackForm = (props) => {
  const initialState = props.selected ? props.selected : {
    title: '',
    artist: ''
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (props.selected) {
      setFormData({ title: props.selected.title, artist: props.selected.artist });
    }
  }, [props.selected]); // Dependency array ensures this only runs when props.selected changes

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTrack = { title: formData.title, artist: formData.artist };

    // If editing a track, update it; otherwise, add a new one
    if (props.selected) {
      await updateTrack(newTrack, props.selected._id);  // Update track API call
    } else {
      await addTrack(newTrack);  // Add track API call
    }
    props.onFormSubmit();  // Refresh the track list after adding/updating
  };

  return (
    <div className="track-form">
      <h2>{props.selected ? 'Edit Track' : 'Add New Track'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">{props.selected ? 'Update Track' : 'Add Track'}</button>
      </form>
    </div>
  );
};

export default TrackForm;
