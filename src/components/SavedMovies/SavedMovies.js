import React from 'react';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';


function SavedMovies({
    cards,
    savedCards,
    deleteMovie,
    createSavedMovie,
    pageType


}) {
    return (
        <main className="moviesList">
            <MoviesList
                cards={cards}
                savedCards={savedCards}
                deleteMovie={deleteMovie}
                createSavedMovie={createSavedMovie}
                pageType={pageType}
            />
            <Footer />
        </main >
    );
}

export default SavedMovies;