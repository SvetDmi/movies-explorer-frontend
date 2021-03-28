import React from 'react';
import { useHistory } from "react-router-dom";


function NotFound() {
    const history = useHistory();

    return (
        <section className="notFound">
            <div className="notFound__container">
                <h2 className="notFound__title">404</h2>
                <p className="notFound__text">Страница не найдена</p>

            </div>
            <button className="notFound__button"
                onClick={() => {
                    history.goBack();
                }}
            >
                Назад
            </button>

        </section>
    );
}

export default NotFound;