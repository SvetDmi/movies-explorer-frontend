import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
// import CardList from '../CardList/CardList';
import Card from '../Card/Card'
import Footer from '../Footer/Footer';

function Movies({
    cards,

    isSaved,

}) {

    function handleCardClick() {
        console.log('Save movie')
    }

    return (
        <main className="movies">

            <SearchForm />

            <section className="page__section cardList">
                <ul className="cardsList__items">
                    {
                        cards.map((card) =>
                            < Card
                                card={card}
                                sort={`${isSaved ? 'saved' : 'save'}`}
                                key={card.id}
                                onCardClick={handleCardClick}


                            />
                        )
                    }
                </ul>
            </section>

            <button className="movies__button" type="button" > Ещё</button >
            <Footer />
        </main >
    );
}

export default Movies;