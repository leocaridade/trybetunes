import React from 'react';
import PropTypes from 'prop-types';

function MusicCard({ songs }) {
  const songsList = songs.slice(1).map((song) => (
    <li key={ song.trackId }>
      { song.trackName }
      <audio data-testid="audio-component" src={ song.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
    </li>));
  return (
    <ul>
      { songsList }
    </ul>
  );
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      track: PropTypes.number.isRequired,
      trackName: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MusicCard;
