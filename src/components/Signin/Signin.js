import React from 'react';
import logo from '../../images/logo.svg';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useInput from '../../utils/Hooks/useInput';

function Signin() {

    const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true })
    const password = useInput('', { isEmpty: true, minLength: 5, maxLength: 15 })

    return (
        <section className="page__section_auth">
            <img src={logo} alt="Логотип" className="form__logo" />
            <Form
                formTitle="Рады видеть!"
                buttonText="Войти"
                linkWay="./signup"
                text="Еще не зарегистрированы?"
                linkText="Регистрация"
            >
                <Input
                    placeholder="pochta@yandex.ru"
                    label="Почта"
                    onChange={e => email.onChange(e)}
                    onBlur={e => email.onBlur(e)}
                    value={email.value}
                    name='email'
                    type='text'
                    validError={email.isDirty && (email.minLengthError || email.emailError)}
                />

                <Input
                    label="Пароль"
                    onChange={e => password.onChange(e)}
                    onBlur={e => password.onBlur(e)}
                    value={password.value}
                    name='password'
                    type='password'
                    placeholder=''
                    validError={password.isDirty && (password.minLengthError || password.maxLengthError)}
                />

            </Form>

        </section >
    )
}

export default Signin;
