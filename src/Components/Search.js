import { Component } from 'react';
import Header from './Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
    };
  }

  handleArtistInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artist } = this.state;
    const minArtChar = 2;
    const isArtistValid = artist.length >= minArtChar;

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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
