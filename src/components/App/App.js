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

import { mainApi } from '../../utils/Api/MainApi';
import { getMovies } from '../../utils/Api/MoviesApi';
import { register, login, checkToken } from '../../utils/Api/AuthApi';
import * as SERVER_ANSWER from '../../utils/errorsMessages';

import './App.css';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [permissionsChecked, setPermissionsChecked] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);

  const [pageType, setPageType] = React.useState(true);

  const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);


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
          console.log(`Ошибка: ${err}. Проблема с токеном`);
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
          setLoggedIn(true)
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
        } console.log(`Ошибка: ${err.code}`)
      })
  }

  function onLogin({ email, password }) {
    return login(email, password)
      .then((res) => {
        if (!res) {
          console.log("Проверьте правильность введенных данных")
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
        } console.log(`Ошибка: ${err.code}`)
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
  // А ВОТ ТУТ СТЕЙТ СОХРАНЕННЫХ ОБНОВЛЯЕТСЯ
  function handleSaveCard(movie) {
    if (pageType) {
      mainApi.createMovie(movie)
        .then((savedCard) => {
          setSavedCards([savedCard, ...savedCards]);

          console.log(savedCard)
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    } else {
      mainApi.createSavedMovie(movie)
        .then((savedCard) => {
          setSavedCards([savedCard, ...savedCards]);

          console.log(savedCard)
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    }
  }

  function deleteMovie(card) {
    mainApi.deleteMovie(card._id)
      .then((deletedCard) => {
        const newCards = savedCards.filter((c) => c._id !== deletedCard._id);
        setSavedCards(newCards)
        console.log('delete')
      })
      .catch(err => {
        console.log(`При удалении карточки: ${err}`)
      })
  }

  function handleDeleteCard(card) {
    if (pageType) {
      const savedMovie = savedCards.find((c) => c.movieId === card.id);
      deleteMovie(savedMovie)

    } else {
      deleteMovie(card)
    }
  }


  //  Хедер

  function handleMovieClick() {
    setPageType(true);

  }
  function handleSavedMovieClick() {
    setPageType(false);
  }
  function openPopup() {
    setMenuPopupOpen(true);
  }

  function closePopup() {
    setMenuPopupOpen(false);
  }

  if (!permissionsChecked) {
    return null
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onMenuClick={openPopup}
          onMovieClick={handleMovieClick}
          onSavedMovieClick={handleSavedMovieClick}
        />
        <Switch>

          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Movies
              cards={cards}
              savedCards={savedCards}
              onDeleteCard={handleDeleteCard}
              onSaveCard={handleSaveCard}
              pageType={pageType}

            />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              cards={savedCards}
              savedCards={savedCards}
              onDeleteCard={handleDeleteCard}
              onSaveCard={handleSaveCard}
              pageType={pageType}
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
            <Signup
              onRegister={onRegister}
              serverError={serverError}
            />
          </Route>

          <Route path="/signin">
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
          onClose={closePopup}
        />
      </CurrentUserContext.Provider>

      <Route >
        {loggedIn ? <Redirect to='/movies' /> : <Redirect to='/' />}
      </Route>
    </div >
  );
}

export default App;
