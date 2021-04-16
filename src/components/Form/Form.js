import React from 'react';
import { Link } from 'react-router-dom';


function Form({ buttonText, sort, formTitle, linkWay, text, linkText, children, onSubmit, onClick, isValidAll, serverError }) {

    return (
        <div className='form' >

            <form className="form__form" method="post" action="#" noValidate onSubmit={onSubmit} serverError={serverError} >
                <h2 className={`form__title form__title_${sort}`}>{formTitle}</h2>

                {children}

                <div className={`form__down form__down_${sort}`}>
                    <p className="form__servererror">{`${serverError ? serverError : ''}`}</p>
                    <button
                        type="submit"
                        disabled={!isValidAll}
                        className={`form__button form__button_${sort} ${isValidAll ? 'form__button_active' : 'form__button_disabled'}`}
                    > {buttonText}
                    </button>
                    <p className={`form__text form__text_${sort}`}>{text}  <Link to={linkWay} onClick={onClick} className={`form__link form__link_${sort}`}>{linkText}</Link></p>

                </div>
            </form>
        </div >
    )
}

export default Form;
