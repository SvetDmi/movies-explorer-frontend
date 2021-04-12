import React from 'react';

// import useInput from '../../utils/Hooks/useInput';


function SearchForm({ onSearchSubmit, cards, movieSearch, searchWord, onToggle }) {
    // const movieSearch = useInput('', { minLength: 2, noEmpty: 2 });
    const [isFocus, setFocus] = React.useState(false);

    function formFocus() {
        setFocus(true)
    }
    function formNoFocus() {
        setFocus(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // let searchWord = movieSearch.value
        onSearchSubmit(cards, searchWord);
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

                    // value={value}
                    // onChange={onChange}
                    // onBlur={onBlur}
                    required
                />
                {((movieSearch.isDirty && movieSearch.minLengthError) && movieSearch.noEmpty) &&

                    <span className='searchForm__input_error'>Нужно ввести ключевое слово</span>}
                <button
                    type="submit"
                    className="searchForm__button"
                    disabled={!movieSearch.inputValid}

                // disabled={disabled}

                >
                </button>
            </form>
            {/* 
            <label htmlFor="checkbox" className="searchForm__shortMovies">
                <span className="searchForm__text">Короткометражки</span>
                <input 
                type="checkbox" 
                className="searchForm__switch searchForm__switch_active "
                // onChange={toggleSwitch}
                
                />
            </label> */}
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

            {/* <div className="search-bar__container">
          <label htmlFor="checkbox" className="search-bar__switch">
            <input type="checkbox" 
              className="search-bar__checkbox" 
              onChange={toggleCheckbox} id="checkbox"
            />
            <span className="search-bar__slider"></span>
          </label>
          <p className="search-bar__placeholder">Короткометражки</p>
        </div> */}

        </section >
    );
}

export default SearchForm;