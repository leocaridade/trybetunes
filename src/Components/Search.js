import { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      artistAlbums: [],
      loading: false,
      searched: false,
      text: '',
      searchedArtist: '',
    };
  }

  handleArtistInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleArtistBtn = async (event) => {
    event.preventDefault();
    const { artist } = this.state;
    this.setState({
      loading: true,
      searched: true,
    });

    const artistAlbums = await searchAlbumsAPI(artist);

    this.setState({
      artistAlbums,
      searchedArtist: artist,
      loading: false,
      text: 'Resultado de álbuns de:',
      artist: '',
    });
  };

  render() {
    const { artist, artistAlbums, loading, searched, text, searchedArtist } = this.state;
    const minArtChar = 2;
    const isArtistValid = artist.length >= minArtChar;

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="artist"
            value={ artist }
            placeholder="Nome do Artista"
            onChange={ this.handleArtistInput }
          />
          <button
            data-testid="search-artist-button"
            disabled={ !isArtistValid }
            onClick={ this.handleArtistBtn }
          >
            Pesquisar
          </button>
        </form>
        <div>
          {
            searched && artistAlbums.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
              <div>
                <p>
                  {`${text} ${searchedArtist}`}
                </p>
                <ul>
                  {artistAlbums.map((album) => (
                    <li key={ album.collectionId }>
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <p>{album.collectionName}</p>
                      <p>{album.artistName}</p>
                      <p>{album.releaseDate}</p>

                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        List of songs
                      </Link>

                    </li>
                  ))}
                </ul>
              </div>
            )
          }

        </div>
      </div>
    );
  }
}

export default Search;
