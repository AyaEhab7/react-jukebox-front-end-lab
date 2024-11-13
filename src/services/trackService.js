const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

// Get tracks
export const getTracks  = async ()=> {
    try {
      const res = await fetch(BASE_URL)
      const tracks = await res.json();
  
      return tracks
    } catch (err) {
      console.log(err)
    }
  }

  export const addTrack  = async (newTrack) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrack),
      })
      const track = await res.json()
      return track
    } catch (error) {
      console.log(error)
    }
  }

  export async function updateTrack  (updatedTrack, tracksId){
    try {
      const res = await fetch(`${BASE_URL}/${tracksId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTrack),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  export async function deleteTrack(tracksId){
    try {
      const res = await fetch(`${BASE_URL}/${tracksId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      return await res.json()
    } catch (error) {
      console.log(error)
    }
  }