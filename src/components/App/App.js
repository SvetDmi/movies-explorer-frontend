import './App.css';
import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { FindedMoviesContext } from '../../contexts/FindedMoviesContext';
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
// import useInput from '../../utils/Hooks/useInput';
// import useWindowSize from '../../utils/Hooks/useWindowSize';


import './App.css';

function App() {
  const history = useHistory();
  // const windowWidth = useWindowSize();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [serverError, setServerError] = React.useState(" ");
  const [isAuthResult, setAuthResult] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);



  const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);


  //Авторизация

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token).then((res) => {
        if (res) {
          setLoggedIn(true)
        }
      })
        .catch(err => {
          console.log(`Ошибка: ${err}. Проблема с токеном`);
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);


  function onRegister({ name, email, password }) {
    return register(name, email, password)
      .then((res) => {
        if (res) {
          setAuthResult(true);
          localStorage.setItem('token', res.token);
          tokenCheck();
          mainApi.refreshHeaders();
          history.push('/signin');
        }
        else {
          setAuthResult(false);
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
          history.push('/movies');
        }
      })
      // .catch((err) => console.log(`Ошибка: ${err}. Пользователь с такими данными не найден`));
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
        setCards(cardsData)
        // setFindedCards(localStorage.getItem("localData"))
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

  function onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cardsData');
    setLoggedIn(false);
    mainApi.refreshHeaders();
    history.push('/signin');
  }

  // Фильмы

  function handleSaveCard(movie) {
    mainApi.createMovie(movie)
      .then((savedCard) => {
        setSavedCards([savedCard, ...savedCards]);
        console.log(savedCard)
      })
      .catch((err) => {
        console.log(`${err}`);

      })
  }

  function handleDeleteCard(card) {
    const savedMovie = savedCards.find((c) => c.movieId === card.id);
    mainApi.deleteMovie(savedMovie._id)
      .then((deletedCard) => {
        const newCards = savedCards.filter((c) => c._id !== deletedCard._id);
        setSavedCards(newCards)
        console.log('delete')

      })
      .catch(err => {
        console.log(`При удалении карточки: ${err}`)
      })
  }

  // function handleCardClick(card) {
  //   const savedCard = savedCards.find((c) => c.movieId === card.id);
  //   if (savedCard) {
  //     handleDeleteCard(savedCard)

  //   } else {
  //     handleSaveCard(card)

  //   }
  // }


  // // зависимость от ширины экрана
  // let countCards = 0;
  // let countNewCards = 0;
  // const [countMovies, setCountMovies] = React.useState(countCards);

  // if (windowWidth > 750) {
  //   countCards = 12;
  //   countNewCards = 4;
  // } else if (windowWidth > 450) {
  //   countCards = 8;
  //   countNewCards = 2;
  // } else if (windowWidth <= 450) {
  //   countCards = 5;
  //   countNewCards = 2;
  // }

  // function handleMoreCards() {
  //   setCountMovies(countMovies + countNewCards);
  // }

  // const [findCards, setFindCards] = React.useState(false);
  // // const [searchQuery, setSearchQuery] = React.useState('')
  // const [isLoading, setLoading] = React.useState(false);
  // const [isChecked, setChecked] = React.useState(false);
  // const searchMovie = useInput('', { minLength: 2, noEmpty: 2 });
  // const searchQuery = searchMovie.value;

  // function handleToggle() {
  //   setChecked(!isChecked);
  // }

  // function filterCards(cards) {
  //   let filteredData = cards.filter((card) => {
  //     return card.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
  //   });

  //   if (filteredData !== 0 && !isChecked) {
  //     setFindCards(filteredData)
  //     localStorage.setItem("localData", JSON.stringify(filteredData));
  //     console.log(filteredData);
  //   } else if (filteredData !== 0 && isChecked) {
  //     const filteredShortData = cards.filter((card) => {
  //       return card.duration <= 40 && card.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
  //     })
  //     setFindCards(filteredShortData)
  //     localStorage.setItem("localData", JSON.stringify(filteredShortData));
  //     console.log(filteredShortData);
  //   };
  //   console.log('Фильмы не найдены')
  // }


  // function handleSearchSubmit(searchQeury) {
  //   setLoading(true);
  //   // const localData = JSON.parse(localStorage.getItem("localData"));
  //   filterCards(cards, searchQeury)
  //   setLoading(false);
  // }


  // Сохраненные фильмы


  //  Мобильное меню
  function openPopup() {
    setMenuPopupOpen(true);
  }

  function closePopup() {
    setMenuPopupOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onMenuClick={openPopup}
        />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>


          <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
            <Movies
              cards={cards}
              savedCards={savedCards}
              onDeleteCard={handleDeleteCard}
              onSaveCard={handleSaveCard}
              pageType='Movies'
            />
          </ProtectedRoute>

          <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              cards={savedCards}
              savedCards={savedCards}
              onDeleteCard={handleDeleteCard}
              onSaveCard={handleSaveCard}
              pageType='SavedMovies'
            />
          </ProtectedRoute>


          <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
            <Profile
              onLogout={onLogout}
              onEditUser={onEditUser}
              serverError={serverError}
            />
          </ProtectedRoute>


          <Route exact path="/signup">
            <Signup
              onRegister={onRegister}
              serverError={serverError}
            />
          </Route>

          <Route exact path="/signin">
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
        {loggedIn ? <Redirect to='/movies' /> : <Redirect to='/signin' />}
      </Route>
    </div >
  );
}

export default App;
