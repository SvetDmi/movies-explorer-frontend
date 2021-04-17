import React from 'react';
import logo from '../../images/logo.svg';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useInput from '../../utils/Hooks/useInput';
import { ERROR_EMAIL, ERROR_PASSWORD } from '../../utils/errorsMessages'

function Signin({ onLogin, serverError }) {

    const email = useInput('', { isEmpty: true, isEmail: true })
    const password = useInput('', { isEmpty: true, minLength: 8, maxLength: 15 })

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email: email.value, password: password.value })

    }

    return (
        <section className="page__section_auth">
            <img src={logo} alt="Логотип" className="form__logo" />
            <Form
                formTitle="Рады видеть!"
                buttonText="Войти"
                linkWay="./signup"
                text="Еще не зарегистрированы?"
                linkText="Регистрация"
                onSubmit={handleSubmit}
                isValidAll={email.inputValid && password.inputValid}
                serverError={serverError}
            >
                <Input
                    placeholder="pochta@yandex.ru"
                    label="Почта"
                    onChange={e => email.onChange(e)}
                    onBlur={e => email.onBlur(e)}
                    value={email.value}
                    name='email'
                    type='text'
                    errorMessage={ERROR_EMAIL}
                    validError={email.isDirty && (email.minLengthError || email.emailError)}
                />

                <Input
                    placeholder="Введите пароль"
                    label="Пароль"
                    onChange={e => password.onChange(e)}
                    onBlur={e => password.onBlur(e)}
                    value={password.value}
                    name='password'
                    type='password'
                    errorMessage={ERROR_PASSWORD}
                    validError={password.isDirty && (password.minLengthError || password.maxLengthError)}
                />

            </Form>

        </section >
    )
}

export default Signin;
