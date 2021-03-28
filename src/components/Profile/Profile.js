import React from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useInput from '../../utils/Hooks/useInput';


function Profile() {
    const name = useInput('', { minLength: 5, maxLength: 30 })
    const email = useInput('', { minLength: 3, isEmail: true })

    return (
        <section className="page__section_white">
            <Form
                sort="profile"
                formTitle="Привет, Светлана!"
                buttonText="Редактировать"
                linkWay="./signup"
                text=""
                linkText="Выйти из аккаунта"
            >
                <Input
                    placeholder="Светлана"
                    label="Имя"
                    onChange={e => name.onChange(e)}
                    onBlur={e => name.onBlur(e)}
                    value={name.value}
                    type="text"
                    name="name"
                    validError={name.isDirty && (name.minLengthError || name.maxLengthError)}
                />

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
            </Form>

        </section>
    )
}

export default Profile;
