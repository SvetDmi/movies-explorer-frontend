import React from 'react';
import { NavLink } from 'react-router-dom';

function Popup({ isOpen, onClose }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <nav className={`popup__container ${isOpen ? 'popup__container_opened' : ''}`}>
                <button type="button" className="popup__close" onClick={onClose}></button>
                <NavLink exact to="./" className="popup__link" activeClassName="popup__link_active" >Главная</NavLink>
                <NavLink to="./movies" className="popup__link" activeClassName="popup__link_active">Фильмы</NavLink>
                <NavLink to="./saved-movies" className="popup__link" activeClassName="popup__link_active">Сохраненные фильмы</NavLink>
                <div className="popup__sign">
                    <NavLink to="./profile" className="popup__link popup__sign_profile" activeClassName="popup__link_active">Аккаунт</NavLink>
                    <NavLink to="./profile" className="popup__sign_profilePic"></NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Popup;
