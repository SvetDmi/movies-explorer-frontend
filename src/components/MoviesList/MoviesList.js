import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card'

import useInput from '../../utils/Hooks/useInput';
import Preloader from "../Preloader/Preloader";
import useWindowSize from '../../utils/Hooks/useWindowSize';
import SearchMessage from '../SearchMessage/SearchMessage';


function MoviesList({
    cards,
    savedCards,
    pageType,
    onDeleteCard,
    onSaveCard,
}) {
    const [foundCards, setFoundCards] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [isChecked, setChecked] = React.useState(false);
    const [isSearchEmpty, setSearchEmpty] = React.useState(false)
    const movieSearch = useInput('', { minLength: 2, noEmpty: 2 });
    const windowWidth = useWindowSize();
    const searchWord = movieSearch.value;

    // зависимость от ширины экрана
    let countCards = 0;
    let countNewCards = 0;
    const [countMovies, setCountMovies] = React.useState(countCards);

    if (windowWidth > 750) {
        countCards = 12;
        countNewCards = 4;
    } else if (windowWidth > 450) {
        countCards = 8;
        countNewCards = 2;
    } else if (windowWidth <= 450) {
        countCards = 5;
        countNewCards = 2;
    }

    function handleMoreCards() {
        setCountMovies(countMovies + countNewCards);
    }

    function handleToggle() {
        setChecked(!isChecked);
    }

    React.useEffect(() => {
        filterCards(cards, searchWord, isChecked);
    }, [savedCards])

    // ВОТ ТУТ СТЕЙТ НАЙДЕННЫХ КАРТОЧЕК ОБНОВЛЯЕТСЯ и там внизу в return идет foundCards.map 
    function filterCards(cards, searchWord, isChecked) {
        if (!searchWord) {
            setFoundCards([]);
            return
        }
        let filteredData = cards.filter((card) => {
            let fits = card.nameRU.toLowerCase().includes(searchWord.toLowerCase());
            return isChecked ? fits && card.duration <= 40 : fits;
        })
        if (filteredData.length === 0) {
            setSearchEmpty(true)
            setLoading(false);
            setFoundCards(filteredData)

        } else {
            setSearchEmpty(false)
            setLoading(false);
            setFoundCards(filteredData)
            console.log(filteredData);
        }
    }

    function getStateClass() {
        if (!pageType) {
            return 'moviesList__button moviesList__button_hidden';
        }
        else {
            if (foundCards.length <= 12 || countMovies >= foundCards.length) {
                return 'moviesList__button moviesList__button_hidden';
            } else { return 'moviesList__button' }
        }
    }

    function handleSearchSubmit(cards, searchWord, isChecked) {
        setLoading(true);
        setFoundCards([]);
        setTimeout(() => {
            filterCards(cards, searchWord, isChecked);
        }, 1000);
    }


    let element;
    if (isLoading) {
        element = <Preloader />
    } else if (isSearchEmpty) {
        element = <SearchMessage />
    }

    return (

        <React.Fragment>

            <SearchForm
                onSearchSubmit={handleSearchSubmit}
                cards={cards}
                movieSearch={movieSearch}
                searchWord={searchWord}
                isChecked={isChecked}
                onToggle={handleToggle}
            />
            <section className="page__section ">
                <ul className="moviesList__items">
                    {element}
                    {
                        foundCards.map((card) =>
                            <Card
                                card={card}
                                key={card.id || card._id}
                                pageType={pageType}
                                liked={savedCards.find((c) => c.movieId === card.id)}
                                onDeleteCard={onDeleteCard}
                                onSaveCard={onSaveCard}
                                savedCards={savedCards}
                            />
                        )
                    }
                </ul>

            </section>

            <button
                // className={`moviesList__button ${foundCards.length <= 12 || countMovies >= foundCards.length ? 'moviesList__button_hidden' : ''}`}
                className={getStateClass()}
                type="button"
                onClick={handleMoreCards}>
                Ещё
                </button >
        </React.Fragment >

    )
}

export default MoviesList;