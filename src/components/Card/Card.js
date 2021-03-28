import React from 'react';
import CardPhoto from '../../images/movie_pic1.jpg';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ isSaved, isLiked, buttonText }) {

    const cardClassName = () => {
        if (isSaved) {
            return 'card__button card__button_delete'
        } else if (isLiked) {
            return 'card__button card__button_like'
        } else if (!isSaved && !isLiked) {
            return 'card__button card__button_save'
        }
    }

    return (
        <li className="card__item" >
            <div className="card__label">
                <h2 className="card__title">В погоне за Бенкси</h2>
                <p className="card__time">27 минут</p>
            </div>
            <img src={CardPhoto} alt="Картинка фильма - заглушка" className="card__img" />
            <button className={cardClassName()} type="submit">{buttonText}</button>
        </li >
    );
}

export default Card;
