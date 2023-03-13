import { Component } from 'react';
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
        <p data-testid="header-user-name">{ userName }</p>
      </header>
    );
  }
}

export default Header;
