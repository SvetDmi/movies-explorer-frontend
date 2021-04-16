import React from 'react';
import logo from '../../images/logo.svg';
import { Route, Switch, Link, NavLink } from 'react-router-dom';

function Header({ onMenuClick, onMovieClick, onSavedMovieClick }) {

    return (

        <header className="page__section  header" >
            <Link to='/'>
                <img src={logo} alt="Логотип" className="header__logo" /></Link>
            <Switch>
                <Route path={["/movies/", "/saved-movies/", "/profile/"]}>
                    <nav className="header__movies" >
                        <NavLink to="./movies" className="page__link" activeClassName="page__link_active" onClick={onMovieClick} >Фильмы</NavLink>
                        <NavLink to="./saved-movies" className="page__link" activeClassName="page__link_active" onClick={onSavedMovieClick}>Сохраненные фильмы</NavLink>
                    </nav>
                    <nav className="header__profile">
                        <NavLink to="./profile" className="page__link header__profile_akk">Аккаунт</NavLink>
                        <NavLink to="./profile" className="page__link header__profile_pic"></NavLink>
                    </nav>
                    <button type="button" className="header__mobileMenu" onClick={onMenuClick}></button>

                </Route>
                <Route path="/">
                    <nav className="header__sign">
                        <NavLink to="./signup" className="page__link header__sign_register">Регистрация</NavLink>
                        <NavLink to="./signin" className="page__link header__sign_enter">Войти</NavLink>
                    </nav>
                </Route>
            </Switch>

        </header >
    );
}

export default Header;
