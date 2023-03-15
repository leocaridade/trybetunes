import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: props.songs.slice(1).map((song) => {
        const favorited = props.favoriteSongs
          .some((favSong) => favSong.trackId === song.trackId);
        return { ...song, favorited };
      }),
      loading: false,
    };

    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  async handleCheckboxClick(event) {
    this.setState({ loading: true });
    const { songs } = this.state;
    const track = songs.find((song) => song.trackId === Number(event.target.value));
    await addSong(track);
    await removeSong(track);
    if (track.favorited) {
      track.favorited = false;
    } else {
      track.favorited = true;
    }
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
            onChange={ this.handleCheckboxClick }
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
  favoriteSongs: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number,
    }),
  ).isRequired,
};

export default MusicCard;
