import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import CardList from '../CardList/CardList';
import Card from '../Card/Card'
import Footer from '../Footer/Footer';

function Movies(

) {
    return (
        <main className="movies">

            <SearchForm />
            <CardList>
                <Card
                    isLiked={true}
                />
                <Card
                    isLiked={true}
                />
                <Card
                    buttonText="Сохранить"
                />
                <Card
                    buttonText="Сохранить"
                />
                <Card
                    buttonText="Сохранить"
                />
                <Card
                    isLiked={true}
                />
                <Card
                    isLiked={true}
                />
                <Card
                    buttonText="Сохранить"
                />
                <Card
                    buttonText="Сохранить"
                />
                <Card
                    buttonText="Сохранить"
                />
                <Card
                    isLiked={true}
                />
                <Card
                    buttonText="Сохранить"
                />
            </CardList>
            <button className="movies__button" type="button">Ещё</button>
            <Footer />
        </main>
    );
}

export default Movies;