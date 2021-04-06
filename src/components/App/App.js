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
// import MenuPopup from '../MenuPopup/MenuPopup';
import NotFound from '../NotFound/NotFound';
import { getMovies } from '../../utils/Api/MoviesApi';
import { mainApi } from '../../utils/Api/MainApi';
import { register, login, checkToken } from '../../utils/Api/AuthApi';

import './App.css';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAuthResult, setAuthResult] = React.useState(false);

  // const [isMenuPopupOpen, setMenuPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isSaved, setSaved] = React.useState(false);
  const [isLiked, setLiked] = React.useState(false);

  // Основные данные

  React.useEffect(() => {
    if (!loggedIn) {
      return;
    }
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData)
      });
  }, [loggedIn]);

  React.useEffect(() => {
    if (!loggedIn) {
      return;
    }
    getMovies()
      .then((cardsData) => {
        setCards(cardsData);
      });
  }, [loggedIn]);



  // function getAllInfo() {
  //   return Promise.all(mainApi.getUserInfo(), getMovies())
  // }

  // // карточки с фильмами

  // React.useEffect(() => {
  //   if (!loggedIn) {
  //     return;
  //   }
  //   getAllInfo()
  //     .then((userData, cardsData) => {
  //       setCurrentUser(userData);
  //       setCards(cardsData);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     });
  // }, [loggedIn]);

  //мобильное меню

  // function openPopup() {
  //   setMenuPopupOpen(true);
  // }

  // function closePopup() {
  //   setMenuPopupOpen(false);
  // }

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
          history.push('/movies');
        }
        else {
          setAuthResult(false);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}. Некорректно заполнено одно из полей`);
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
      .catch((err) => console.log(`Ошибка: ${err}. Пользователь с такими данными не найден`));
  }


  // Профиль

  function onEditUser(userInfo) {
    mainApi.editUserInfo(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo)
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err)
      })

  }

  function onLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    mainApi.refreshHeaders();
    history.push('/signin');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
        // onMenuClick={openPopup}
        />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
            <Movies
              cards={cards}
              isSaved={isSaved}
            />
          </ProtectedRoute>

          <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
            <Profile
              onLogout={onLogout}
              onEditUser={onEditUser}
            />
          </ProtectedRoute>


          <Route exact path="/signup">
            <Signup
              onRegister={onRegister} />
          </Route>

          <Route exact path="/signin">
            <Signin
              onLogin={onLogin}
            />
          </Route>

          <Route path="*">
            < NotFound />
          </Route>

        </Switch>

        {/* <MenuPopup
        isOpen={isMenuPopupOpen}
        onClose={closePopup}
      /> */}
      </CurrentUserContext.Provider>

      <Route >
        {loggedIn ? <Redirect to='/movies' /> : <Redirect to='/signin' />}
      </Route>
    </div >
  );
}

export default App;
