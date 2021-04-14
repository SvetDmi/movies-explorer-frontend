import React from 'react';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';


function SavedMovies({
    cards,
    savedCards,
    onDeleteCard,
    onSaveCard,
    pageType


}) {
    return (
        <main className="moviesList">
            <MoviesList
                cards={cards}
                savedCards={savedCards}
                onDeleteCard={onDeleteCard}
                onSaveCard={onSaveCard}
                pageType={pageType}
            />
            <Footer />
        </main >
    );
}

export default SavedMovies;