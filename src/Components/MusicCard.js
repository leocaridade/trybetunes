import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: props.songs.slice(1).map((song) => ({ ...song, favorited: false })),
      loading: false,
    };

    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  async handleCheckboxClick(event) {
    this.setState({ loading: true });
    const { songs } = this.state;
    const track = songs.find((song) => song.trackId === Number(event.target.value));
    await addSong(track);
    track.favorited = true;
    this.setState({ songs, loading: false });
  }

  render() {
    const { songs, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    const songsList = songs.map((song) => (
      <li key={ song.trackId }>
        { song.trackName }
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${song.trackId}` }
            value={ song.trackId }
            checked={ song.favorited }
            onClick={ this.handleCheckboxClick }
          />
        </label>
      </li>));

    return (
      <ul>
        { songsList }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      track: PropTypes.number,
      trackName: PropTypes.string,
      previewUrl: PropTypes.string,
    }),
  ).isRequired,
};

export default MusicCard;
