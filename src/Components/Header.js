import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.handleLoading();
  }

  handleLoading = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, userName: user.name });
  };

  render() {
    const { loading, userName } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <header data-testid="header-component">
        <nav>
          <ul>
            <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
          </ul>
        </nav>

        <p data-testid="header-user-name">{ userName }</p>
      </header>
    );
  }
}

export default Header;
