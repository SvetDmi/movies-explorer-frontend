import React from 'react';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import myPhoto from '../../images/myPhoto.jpg';
import ScrollableAnchor from 'react-scrollable-anchor';

function AboutMe() {

    return (
        <ScrollableAnchor id={'section3'}>
            <section className="aboutMe page__section" >
                <h2 className="page__title">Студент</h2>
                <div className="aboutMe__resume">
                    <h3 className="aboutMe__name">Светлана</h3>
                    <h4 className="aboutMe__job">Фронтенд-разработчик</h4>
                    <p className="page__text aboutMe__text">Я живу в Санкт-Петербурге. Закончила факультет журналистики СПбГУ,
                    работала в различных СМИ, пройдя путь от газетного журналиста до редактора интернет-изданий. Всегда было интересно узнать, как
                    же создаются интернет-ресурсы, на которых я работаю и которыми активно пользуюсь. Курсы Яндекс.Практикума помогли в этом разобраться, и роль "создателя"
                    оказалась намного интересней роли "пользователя". Планирую развиваться в этом направлении.
                    </p>
                    <div className="aboutMe__links">
                        <a href="https://www.facebook.com/svedlana" target="_blank" rel="noreferrer"
                            className="page__link">Facebook</a>
                        <a href="https://github.com/SvetDmi" target="_blank" rel="noreferrer"
                            className="page__link"> GitHub</a>

                    </div>
                    <img className="aboutMe__photo" src={myPhoto} alt="Фото Светланы"></img>
                </div>
                <Portfolio />
            </section>
        </ScrollableAnchor>
    );
}

export default AboutMe;
