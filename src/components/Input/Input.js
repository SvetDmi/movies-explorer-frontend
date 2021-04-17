import React from 'react';

const Input = ({ variant, label, onChange, onBlur, value, name, type, placeholder, autoComplete, validError, errorMessage }) => {
    return (
        <div className={`input input_${variant}`}>
            <label
                className={`input__label input__label_${variant}`}
            >
                {label}
            </label>
            <input
                className={`input__box input__box_${variant} ${validError ? 'input__box_error' : ''}`}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}                
                required />
            {(validError) && <span className='input__error'>{errorMessage}</span>}

        </div>
    )
}

export default Input;
