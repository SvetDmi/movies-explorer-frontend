import React from 'react';
import useInput from '../../utils/Hooks/useInput';

function SearchForm() {
    const movie = useInput('', { minLength: 2 })

    return (
        <section className="searchForm page__section">
            <form action="#" method="get" className="searchForm__form" noValidate>
                <input className="searchForm__input"
                    type="search"
                    name="movie"
                    value={movie.value}
                    placeholder='Фильм'
                    onChange={e => movie.onChange(e)}
                    onBlur={e => movie.onBlur(e)}
                />
                {(movie.isDirty && movie.minLengthError) && <span className='searchForm__input_error'>Что-то пошло не так</span>}
                <button type="submit" className="searchForm__button"></button>
            </form>

            <div className="searchForm__shortMovies">
                <p className="searchForm__text">Короткометражки</p>
                <div className="searchForm__switch searchForm__switch_active "></div>
            </div>

        </section>
    );
}

export default SearchForm;