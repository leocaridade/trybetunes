import { Component } from 'react';
import Header from './Header';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Profile Edit</p>
      </div>
    );
  }
}

export default ProfileEdit;
