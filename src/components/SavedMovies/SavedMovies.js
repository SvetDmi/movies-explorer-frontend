import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import CardList from '../CardList/CardList';
import Card from '../Card/Card'
import Footer from '../Footer/Footer';


function SavedMovies(

) {
    return (
        <main className="movies">
            <SearchForm
            />
            <CardList>
                <Card
                    isSaved={true}
                />
                <Card
                    isSaved={true}
                />
                <Card
                    isSaved={true}
                />
            </CardList>
            <Footer />
        </main>
    );
}

export default SavedMovies;