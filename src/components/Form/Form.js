import React from 'react';
import { Link } from 'react-router-dom';


function Form({ buttonText, sort, formTitle, linkWay, text, linkText, children, onSubmit, onClick, isValidAll }) {

    return (
        <div className='form' >

            <form className="form__form" method="post" action="#" noValidate onSubmit={onSubmit}>
                <h2 className="form__title">{formTitle}</h2>
                {children}

                <div className={`form__down form__down_${sort}`}>
                    <button
                        type="submit"
                        disabled={!isValidAll}
                        className={`form__button form__button_${sort} ${isValidAll ? 'form__button_active' : 'form__button_disabled'}`}
                    > {buttonText}
                        {/* {isLoading ? <Preloader /> : buttonText} */}
                    </button>
                    <p className={`form__text form__text_${sort}`}>{text}  <Link to={linkWay} onClick={onClick} className={`form__link form__link_${sort}`}>{linkText}</Link></p>

                </div>
            </form>
        </div >
    )
}

export default Form;
