import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
    };
  }

  handleLoginInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleBtnClick = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name: `${name}` });
    history.push('/search', this.state);
  };

  render() {
    const { name, loading } = this.state;
    const minNameChar = 3;
    const isNameValid = name.length >= minNameChar;

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-login">
        <input
          type="text"
          name="name"
          value={ name }
          data-testid="login-name-input"
          onChange={ this.handleLoginInput }
        />
        <button
          data-testid="login-submit-button"
          onClick={ this.handleBtnClick }
          disabled={ !isNameValid }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
