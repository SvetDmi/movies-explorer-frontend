import React from 'react';
import useInput from '../../utils/Hooks/useInput';

function SearchForm({ onSearchSubmit }) {
    const movie = useInput('', { minLength: 2, noEmpty: 2 });
    const [isFocus, setFocus] = React.useState(false);

    function formFocus() {
        setFocus(true)
    }
    function formNoFocus() {
        setFocus(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit();
    }

    return (
        <section className="searchForm page__section">
            <form className={`searchForm__form ${isFocus ? 'searchForm__form_focus' : ''}`}
                action="#"
                method="get"
                onSubmit={handleSubmit}
                onFocus={e => formFocus(e)}
                onBlur={e => formNoFocus(e)}
                noValidate>
                <input className="searchForm__input"
                    type="search"
                    name="search"
                    value={movie.value}
                    placeholder='Фильм'
                    onChange={e => movie.onChange(e)}
                    onBlur={e => movie.onBlur(e)}
                    required
                />
                {((movie.isDirty && movie.minLengthError) && movie.noEmpty) && <span className='searchForm__input_error'>Нужно ввести ключевое слово</span>}
                <button type="submit" className="searchForm__button" disabled={!movie.inputValid}></button>
            </form>

            <label className="searchForm__shortMovies">
                <span className="searchForm__text">Короткометражки</span>
                <input type="checkbox" className="searchForm__switch searchForm__switch_active "></input>
            </label>

        </section >
    );
}

export default SearchForm;