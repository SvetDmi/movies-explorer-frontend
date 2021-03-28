import React from 'react';

const Input = ({ sort, label, onChange, onBlur, value, name, type, placeholder, validError }) => {
    return (
        <div className='input'>
            <label className={`input__label input__label_${sort} `}>{label} </label>
            <input
                className={`input__box input__box_${sort} ${validError ? 'input__box_error' : ''}`}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                type={type}
                placeholder={placeholder} />
            {(validError) && <span className='input__error'>Что-то пошло не так</span>}

        </div>
    )
}

export default Input;
