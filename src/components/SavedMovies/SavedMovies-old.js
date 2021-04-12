import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
// import CardList from '../CardList/CardList';
import Card from '../Card/Card'
import Footer from '../Footer/Footer';
import Preloader from "../Preloader/Preloader";


function SavedMovies(
    findCards,
    onCardClick,
    isLoading,
    onSearchSubmit,
    cards,
    searchWord,
    movieSearch,
    onMoreCards,
    countMovies

) {

    return (
        <main className="movies">

            <SearchForm
                onSearchSubmit={onSearchSubmit}
                cards={cards}
                movieSearch={movieSearch}
                searchWord={searchWord}


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
                                    pageType='SavedMovies'
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

export default SavedMovies;