import './App.css';
import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import MenuPopup from '../MenuPopup/MenuPopup';
import NotFound from '../NotFound/NotFound';
import Tooltip from '../Tooltip/Tooltip'


import { mainApi } from '../../utils/Api/MainApi';
import { getMovies } from '../../utils/Api/MoviesApi';
import { register, login, checkToken } from '../../utils/Api/AuthApi';
import * as SERVER_ANSWER from '../../utils/errorsMessages';
import { REGISTRATION_NO } from '../../utils/constants';

import './App.css';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [permissionsChecked, setPermissionsChecked] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);

  const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);



  //Авторизация

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setPermissionsChecked(true)
          }
        })
        .catch(err => {
          console.log(`${SERVER_ANSWER.ERROR_TOKEN}${err}`);
        });
    } else {
      setPermissionsChecked(true)
      setLoggedIn(false)
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);


  function onRegister({ name, email, password }) {
    return register(name, email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          tokenCheck();
          mainApi.refreshHeaders();
          setLoggedIn(true);
          setTooltipOpen(true);
          history.push('/movies');

        }
        else {
          setLoggedIn(false)

        }
      })
      .catch((err) => {
        if (err.code === 400) {
          setServerError(SERVER_ANSWER.ERROR400Signup);
        } else if (err.code === 409) {
          setServerError(SERVER_ANSWER.ERROR409);
        } else if (err.code === 500) {
          setServerError(SERVER_ANSWER.ERROR500);
        } console.log(`${err.code}`)
      })
  }

  function onLogin({ email, password }) {
    return login(email, password)
      .then((res) => {
        if (!res) {
          console.log(`${REGISTRATION_NO}`)
        }
        else {
          localStorage.setItem('token', res.token);
          tokenCheck();
          mainApi.refreshHeaders();
          setLoggedIn(true)
          history.push('/movies');
        }
      })
      .catch((err) => {
        if (err.code === 400) {
          setServerError(SERVER_ANSWER.ERROR400Signup);
        } else if (err.code === 401) {
          setServerError(SERVER_ANSWER.ERROR401Signin);
        } else if (err.code === 403) {
          setServerError(SERVER_ANSWER.ERROR403Signin);
        } else if (err.code === 500) {
          setServerError(SERVER_ANSWER.ERROR500);
        } console.log(`${err.code}`)
      })
  }


  function onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('localData');
    setLoggedIn(false);
    mainApi.refreshHeaders();
    history.push('/');
  }

  // Данные при загрузке

  React.useEffect(() => {
    if (!loggedIn) {
      return;
    }
    Promise.all([
      mainApi.getUserInfo(),
      mainApi.getSavedMovies(),
      getMovies(),
    ])
      .then(([userData, savedData, cardsData]) => {
        console.log(userData, savedData)
        setCurrentUser(userData)
        setSavedCards(savedData)
        localStorage.setItem("localData", JSON.stringify(cardsData));
        const localData = JSON.parse(localStorage.getItem("localData"));
        setCards(localData)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [loggedIn]);


  // Профиль

  function onEditUser(userInfo) {
    mainApi.editUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo)
        history.push('/movies');
      })
      .catch((err) => {
        if (err.code === 400) {
          setServerError(SERVER_ANSWER.ERROR400Profile);
        } else if (err.code === 409) {
          setServerError(SERVER_ANSWER.ERROR409);
        } else if (err.code === 500) {
          setServerError(SERVER_ANSWER.ERROR500);
        } console.log(`Ошибка: ${err.code}`)
      })
  }


  // Фильмы


  function createMovie(movie) {
    mainApi.createMovie(movie)
      .then((savedCard) => {
        setSavedCards([savedCard, ...savedCards]);
        console.log(savedCard)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  function createSavedMovie(movie) {
    mainApi.createSavedMovie(movie)
      .then((savedCard) => {
        setSavedCards([savedCard, ...savedCards]);

        console.log(savedCard)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }


  function deleteMovie(card) {
    mainApi.deleteMovie(card._id)
      .then((deletedCard) => {
        const newCards = savedCards.filter((c) => c._id !== deletedCard._id);
        setSavedCards(newCards)
        console.log('delete')
      })
      .catch(err => {
        console.log(`${err.code}`)
      })
  }

  //  Хедер

  function openMenuPopup() {
    setMenuPopupOpen(true);
  }

  function closeAllPopup() {
    setMenuPopupOpen(false);
    setTooltipOpen(false)
  }

  if (!permissionsChecked) {
    return null
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onMenuClick={openMenuPopup}
          loggedIn={loggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Movies
              cards={cards}
              savedCards={savedCards}
              deleteMovie={deleteMovie}
              createMovie={createMovie}
              pageType={true}
            />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              cards={savedCards}
              savedCards={savedCards}
              deleteMovie={deleteMovie}
              createSavedMovie={createSavedMovie}
              pageType={false}
            />
          </ProtectedRoute>

          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              onLogout={onLogout}
              onEditUser={onEditUser}
              serverError={serverError}
            />
          </ProtectedRoute>

          <Route path="/signup">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
            <Signup
              onRegister={onRegister}
              serverError={serverError}
            />
          </Route>

          <Route path="/signin">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
            <Signin
              onLogin={onLogin}
              serverError={serverError}
            />
          </Route>

          <Route path="*">
            < NotFound />
          </Route>

        </Switch>

        <MenuPopup
          isOpen={isMenuPopupOpen}
          onClose={closeAllPopup}
        />

        <Tooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopup}
          loggedIn={loggedIn}
        />

      </CurrentUserContext.Provider>

    </div >
  );
}


export default App;
