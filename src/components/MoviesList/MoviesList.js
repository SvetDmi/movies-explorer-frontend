import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card'

import useInput from '../../utils/Hooks/useInput';
import Preloader from "../Preloader/Preloader";
import useWindowSize from '../../utils/Hooks/useWindowSize';
import Error from '../Error/Error';



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
    const [searchState, setSearchState] = React.useState({});
    const movieSearch = useInput('', { minLength: 2, noEmpty: 2 });
    const windowWidth = useWindowSize();
    const searchWord = movieSearch.value;

    React.useEffect(() => {
        setSearchState(localStorage.getItem("localData"));
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            filterCards(cards, searchState.searchWord, searchState.isChecked);
        }, 1000);
    }, [searchState, cards])


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

    function filterCards(cards, searchWord, isChecked) {

        // if (!searchWord) {
        //     setFoundCards([]);
        //     return
        // }

        let filteredData = cards.filter((card) => {
            let fits = !searchWord || card.nameRU.toLowerCase().includes(searchWord.toLowerCase());
            return isChecked ? fits && card.duration <= 40 : fits;
        })


        if (isChecked) {
            setFoundCards(filteredData)
            console.log(filteredData);
            setLoading(false);
        } else {
            setFoundCards(filteredData)
            console.log(filteredData);
            setLoading(false);
        }
    }

    function handleSearchSubmit(cards, searchWord) {
        setLoading(true);
        localStorage.setItem("localData", JSON.stringify(searchState));
        setSearchState({ searchWord: searchWord, isChecked: isChecked });
    }



    let element;
    if (isLoading) {
        element = <Preloader />
    }
    else if (foundCards.length === 0 && searchWord) {
        element = <Error />
    }
    // else if (serverError) {
    //     return <p className="errorfindedCards">
    //         Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
    //         Подождите немного и попробуйте ещё раз
    //         </p>
    // }


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
            {/* {isLoading ? (<Preloader />) : */}

            <section className="page__section ">
                <ul className="moviesList__items">
                    {element}
                    {
                        foundCards.map((card) =>
                            <Card
                                card={card}
                                key={card.id}
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
                className={`moviesList__button ${foundCards.length <= 12 || countMovies >= foundCards.length ? 'moviesList__button_hidden' : ''}`}
                type="button"
                onClick={handleMoreCards}>
                Ещё
                </button >
        </React.Fragment >

    )
}

export default MoviesList;