import { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      favoriteSongs: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    // const favoriteSongs = newSongs.filter((song) => song.trackId);
    this.setState({
      songs: favoriteSongs,
      favoriteSongs,
      loading: false,
    });
  }

  render() {
    const { songs, favoriteSongs, loading } = this.state;
    console.log(favoriteSongs);
    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorites</p>
        <MusicCard
          songs={ songs }
          favoriteSongs={ favoriteSongs }
        />
      </div>
    );
  }
}

export default Favorites;
