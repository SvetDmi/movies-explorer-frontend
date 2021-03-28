import React from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';

function Techs() {

    return (
        <ScrollableAnchor id={'section2'}>
            <section className="page__section" >
                <h2 className="page__title">Технологии</h2>
                <div className="techs">
                    <h3 className="techs__title">7 технологий</h3>
                    <p className="page__text">На курсе веб-разработки мы освоили технологии,
                которые применили в дипломном проекте.</p>

                    <ul className="techs__list">
                        <li className="page__text techs__item">HTML</li>
                        <li className="page__text techs__item">CSS</li>
                        <li className="page__text techs__item">JS</li>
                        <li className="page__text techs__item">React</li>
                        <li className="page__text techs__item">Git</li>
                        <li className="page__text techs__item">Express.js</li>
                        <li className="page__text techs__item">mongoDB</li>
                    </ul>
                </div>
            </section>
        </ScrollableAnchor>
    );
}

export default Techs;