const NowPlaying = (props) => {
  if (!props.track) return null;

  return (
    <div>
      <h2>Now Playing</h2>
      <p><strong>Title:</strong> {props.track.title}</p>
      <p><strong>Artist:</strong> {props.track.artist}</p>
    </div>
  );
};

export default NowPlaying;
