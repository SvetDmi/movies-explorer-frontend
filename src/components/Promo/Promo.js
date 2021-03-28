import React from 'react';
import NavTab from '../NavTab/NavTab';
import './Promo.css';

function Promo() {

    return (
        <section className="promo page__section page__section_big">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
            <NavTab />

        </section>
    );
}

export default Promo;