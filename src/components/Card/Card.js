import React from 'react';
// import noImg from '../../images/noImg.jpg'
// import CardPhoto from '../../images/movie_pic1.jpg';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { MOVIE_URL } from '../../utils/Api/MoviesApi';


function Card({ card, onDeleteCard, onSaveCard, pageType, liked }) {
    const movieImg = card.image
        ? `https://api.nomoreparties.co${card.image.url}`
        : console.log('У фильма отсутствует картинка')

    function handleClick(e) {
        e.preventDefault();
        if (!liked) {
            onSaveCard(card)
        } else {
            onDeleteCard(card)
        }
    }

    function getStateClass() {
        if (pageType === 'SavedMovies') {
            return 'delete';
        }
        else if (pageType === 'Movies') {
            if (liked) {
                return 'saved';
            } return 'save'
        } return 'wtf'
    }

    return (
        <li className="card__item">
            <a href={card.trailerLink} target="_blank" rel="noreferrer" className="card__link">
                <div className="card__label">
                    <h2 className="card__title">{card.nameRU}</h2>
                    <p className="card__time">{card.duration}</p>
                </div>
                <img src={movieImg} alt={`Здесь должен был быть кадр из фильма ${card.nameRU}, увы, что-то случилось, и вы его не видите, но 
                вы можете посмотреть трейлер картины, кликнув на этом месте`} className="card__img" />
                {/* <img src={`${MOVIE_URL}${card.image.url}`} */}
                {/* // <img src="https://api.nomoreparties.co/uploads/stones_in_exile_b2f1b8f4b7.jpeg" */}
            </a>
            {/*<button className={`card__button card__button_${sort}`} type="button" onClick={handleClick}></button>*/}
            <button className={`card__button card__button_${getStateClass()}`} type="button"
                onClick={handleClick}></button>
        </li>
    );
}

export default Card;
