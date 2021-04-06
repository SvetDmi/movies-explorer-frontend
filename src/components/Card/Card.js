import React from 'react';
// import noImg from '../../images/noImg.jpg'
// import CardPhoto from '../../images/movie_pic1.jpg';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { MOVIE_URL } from '../../utils/Api/MoviesApi';


function Card({ card, sort, onCardClick }) {


    const movieImg = card.image
        ? `https://api.nomoreparties.co${card.image.url}`
        : console.log('У фильма отсутствует картинка')

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="card__item" >
            <div className="card__label">
                <h2 className="card__title">{card.nameRU}</h2>
                <p className="card__time">{card.duration}</p>
            </div>
            <img src={movieImg} alt={card.nameRU} className="card__img" />
            {/* <img src={`${MOVIE_URL}${card.image.url}`} */}
            {/* // <img src="https://api.nomoreparties.co/uploads/stones_in_exile_b2f1b8f4b7.jpeg" */}

            <button className={`card__button card__button_${sort}`} type="submit" onClick={handleClick}></button>
        </li >
    );
}

export default Card;
