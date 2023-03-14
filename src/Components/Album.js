import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      artistName: '',
      collectionName: '',
      albumDetails: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const arrayOfSongs = await getMusics(id);
    // const songs = arrayOfSongs.splice(1);

    this.setState({
      artistName: arrayOfSongs[0].artistName,
      collectionName: arrayOfSongs[0].collectionName,
      albumDetails: arrayOfSongs,
      loading: false,
    });
  }

  render() {
    const { loading, artistName, collectionName, albumDetails } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <p data-testid="album-name">{ collectionName }</p>
        <MusicCard songs={ albumDetails } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
