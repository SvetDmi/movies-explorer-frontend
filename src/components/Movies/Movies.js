import React from 'react';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';

function Movies({

    cards,
    savedCards,
    deleteMovie,
    createMovie,
    pageType

}) {

    return (
        <main className="moviesList">

            <MoviesList
                cards={cards}
                savedCards={savedCards}
                deleteMovie={deleteMovie}
                createMovie={createMovie}

                pageType={pageType}

            />
            <Footer />
        </main >
    );
}

export default Movies;