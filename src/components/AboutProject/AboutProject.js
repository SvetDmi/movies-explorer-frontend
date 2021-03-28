import React from 'react';
import './AboutProject.css';
import ScrollableAnchor from 'react-scrollable-anchor';


function AboutProject() {

    return (
        <ScrollableAnchor id={'section1'}>
            <section className="page__section">

                <h2 className="page__title">О проекте</h2>
                <div className="aboutProject ">
                    <div className="aboutProject__block1">
                        <h3 className="aboutProject__title">Дипломный проект включал 5 этапов</h3>
                        <p className="page__text">Составление плана, работу над бэкендом, вёрстку,
                добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="aboutProject__block2">
                        <h3 className="aboutProject__title">На выполнение диплома ушло 5 недель</h3>
                        <p className="page__text">У каждого этапа был мягкий и жёсткий дедлайн,
                которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>

                    <p className="page__text aboutProject__time aboutProject__time_1">1 неделя</p>
                    <p className="page__text aboutProject__time aboutProject__time_2">4 недели</p>
                    <p className="page__text aboutProject__part aboutProject__part_1">Backend</p>
                    <p className="page__text aboutProject__part aboutProject__part_2">Frontend</p>
                </div>
            </section>
        </ScrollableAnchor>
    );
}

export default AboutProject;
