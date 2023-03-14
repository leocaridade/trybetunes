import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './Components/Album';
import Favorites from './Components/Favorites';
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Profile from './Components/Profile';
import ProfileEdit from './Components/ProfileEdit';
import Search from './Components/Search';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
          />
          <Route
            exact
            path="/search"
            component={ Search }
          />
          <Route
            exact
            path="/album/:id"
            render={ (props) => <Album { ...props } /> }
          />
          <Route
            exact
            path="/favorites"
            component={ Favorites }
          />
          <Route
            exact
            path="/profile"
            component={ Profile }
          />
          <Route
            exact
            path="/profile/edit"
            component={ ProfileEdit }
          />
          <Route component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
