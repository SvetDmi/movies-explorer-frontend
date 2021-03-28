import './App.css';
import React from 'react';
// import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import MenuPopup from '../MenuPopup/MenuPopup';
import NotFound from '../NotFound/NotFound';

import './App.css';

function App() {

  const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);

  function openPopup() {
    setMenuPopupOpen(true);
  }

  function closePopup() {
    setMenuPopupOpen(false);
  }

  return (
    <div className="page">
      <Header
        onMenuClick={openPopup}
      />

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/movies">
          <Movies
          />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="*">
          < NotFound />
        </Route>

      </Switch>

      <Route path="/signin">
        <Signin />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <MenuPopup
        isOpen={isMenuPopupOpen}
        onClose={closePopup}
      />

    </div>
  );
}

export default App;
