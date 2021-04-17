import React from 'react';
import { MOVIE_URL } from '../../utils/Api/MoviesApi';


function Card({ card, onDeleteCard, onSaveCard, pageType, liked }) {

    function handleClick(e) {
        e.preventDefault();
        if (!pageType) {
            onDeleteCard(card)
        } else {
            if (!liked) {
                onSaveCard(card)
            } else {
                onDeleteCard(card)
            }
        }
    }

    function getStateClass() {
        if (!pageType) {
            return 'delete';
        }
        else if (pageType) {
            if (liked) {
                return 'saved';
            } return 'save'
        } return 'save'
    }

    function getStateUrl() {
        if (!pageType) {
            return `${card.image}`
        } else {
            return `${MOVIE_URL}${card.image.url}`
        }
    }

    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }

    return (
        <li className="card__item">
            <a href={card.trailerLink} target="_blank" rel="noreferrer" className="card__link">
                <div className="card__label">
                    <h2 className="card__title">{card.nameRU}</h2>
                    <p className="card__time">{`${card.duration} ${getNoun(card.duration, 'минута', 'минуты', 'минут')}`}</p>
                </div>
                <img src={`${getStateUrl()}`}
                    alt={`Здесь должен был быть кадр из фильма ${card.nameRU}, увы, что-то случилось, и вы его не видите`}
                    className="card__img" />
            </a>
            <button className={`card__button card__button_${getStateClass()}`} type="button"
                onClick={handleClick}>
            </button>
        </li>
    );
}

export default Card;
