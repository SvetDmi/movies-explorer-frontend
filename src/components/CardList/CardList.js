import React from 'react';
// import Card from '../Card/Card';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function CardList
    ({
        children
    }) {
    // const currentUser = React.useContext(CurrentUserContext);
    return (
        <section className="page__section cardList">
            <ul className="cardsList__items">
                {children}
            </ul>
        </section>
    )
}

export default CardList;
