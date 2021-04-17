import React from 'react';

function SearchForm({ onSearchSubmit, cards, movieSearch, searchWord, onToggle, isChecked }) {

    const [isFocus, setFocus] = React.useState(false);


    function formFocus() {
        setFocus(true)
    }
    function formNoFocus() {
        setFocus(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(cards, searchWord, isChecked);
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
                    type="text"
                    name="search"
                    placeholder='Фильм'
                    value={movieSearch.value}
                    onChange={e => movieSearch.onChange(e)}
                    onBlur={e => movieSearch.onBlur(e)}
                    required
                />
                {((movieSearch.isDirty && movieSearch.minLengthError) && movieSearch.noEmpty) &&

                    <span className='searchForm__input_error'>Нужно ввести ключевое слово</span>}
                <button
                    type="submit"
                    className="searchForm__button"
                    disabled={!movieSearch.inputValid}
                >
                </button>
            </form>

            <p className="searchForm__text">Короткометражки</p>
            <div className="searchForm__check-block">

                <label htmlFor="checkbox" className="searchForm__check-switch">
                    <input type="checkbox"
                        className="searchForm__check-box"
                        onChange={onToggle} id="checkbox"
                    />
                    <span className="searchForm__check-toggle"></span>
                </label>
            </div>
        </section >
    );
}

export default SearchForm;