import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
// import CardList from '../CardList/CardList';
import Card from '../Card/Card'
import Footer from '../Footer/Footer';
// import useInput from '../../utils/Hooks/useInput';
import Preloader from "../Preloader/Preloader";



function Movies({
    findCards,
    onCardClick,
    isLoading,
    onSearchSubmit,
    cards,
    searchWord,
    movieSearch,
    onMoreCards,
    countMovies,
    savedCards,
    isChecked,
    onToggle
}) {

    // let countCards = 0;
    // let countNewCards = 0;
    // const [countMovies, setCountMovies] = React.useState(countCards);

    // if (windowWidth > 750) {
    //     countCards = 12;
    //     countNewCards = 4;
    // } else if (windowWidth > 450) {
    //     countCards = 8;
    //     countNewCards = 2;
    // } else if (windowWidth <= 450) {
    //     countCards = 5;
    //     countNewCards = 2;
    // }

    // function getMoreCards() {
    //     setCountMovies(countMovies + countNewCards);
    // }


    // const [findCards, setFindCards] = React.useState(false);
    // const movieSearch = useInput('', { minLength: 2, noEmpty: 2 });
    // const [isLoading, setIsLoading] = React.useState(false);
    // let searchWord = movieSearch.value;


    // function handleSearchSubmit(searchWord) {
    //     setIsLoading(true);
    //     // const localData = JSON.parse(localStorage.getItem("localData"));
    //     filterCards(cards, searchWord)
    //     setIsLoading(false);
    // }

    // function filterCards(cards) {
    //     let filteredData = cards.filter((card) => {
    //         return card.nameRU.toLowerCase().includes(searchWord.toLowerCase());
    //     });

    //     if (filteredData !== 0) {
    //         setFindCards(filteredData)
    //         localStorage.setItem("localData", JSON.stringify(filteredData));
    //         console.log(filteredData);
    //     } else console.log('Фильмы не найдены')
    // }


    return (
        <main className="movies">

            <SearchForm
                onSearchSubmit={onSearchSubmit}
                cards={cards}
                movieSearch={movieSearch}
                searchWord={searchWord}
                isChecked={isChecked}
                onToggle={onToggle}



            // value={movieSearch.value}
            // onChange={e => movieSearch.onChange(e)}
            // onBlur={e => movieSearch.onBlur(e)}
            // disabled={!movieSearch.inputValid}
            // validator={(movieSearch.isDirty && movieSearch.minLengthError) && movieSearch.noEmpty}
            />
            {isLoading ? (<Preloader />) : (!findCards ? (<div>Ничего не найдено</div>) : (<>
                <section className="page__section cardList">
                    <ul className="cardsList__items">
                        {
                            findCards.map((card) =>
                                < Card
                                    card={card}
                                    key={card.id}
                                    onCardClick={onCardClick}
                                    pageType='Movies'
                                    isLiked={savedCards.find((c) => c.movieId === card.id)}
                                />
                            )
                        }
                    </ul>
                </section>

                <button
                    className={`movies__button ${findCards.length <= 12 || countMovies >= findCards.length ? 'movies__button_hidden' : ''}`}
                    type="button"
                    onClick={onMoreCards}>
                    Ещё
                </button >
            </>))}
            <Footer />
        </main >
    );
}

export default Movies;