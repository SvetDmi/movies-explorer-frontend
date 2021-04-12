import React from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useInput from '../../utils/Hooks/useInput';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Profile({ onLogout, onEditUser, serverError }) {

    const currentUser = React.useContext(CurrentUserContext);
    // const name = useInput(currentUser.name, { minLength: 5, maxLength: 30 })
    // const email = useInput(currentUser.email, { minLength: 3, isEmail: true })
    const name = useInput(currentUser.name)
    const email = useInput(currentUser.email)

    const handleSubmit = (e) => {
        e.preventDefault();
        onEditUser({ name: name.value, email: email.value })
    }

    return (
        <section className="page__section_white">
            <Form
                sort="profile"
                formTitle="Привет, Светлана!"
                buttonText="Редактировать"
                onSubmit={handleSubmit}
                linkWay="./signup"
                text=""
                linkText="Выйти из аккаунта"
                onClick={onLogout}
                isValidAll={email.inputValid && name.inputValid}
                serverError={serverError}
            >
                <Input
                    placeholder=''
                    label="Имя"
                    onChange={e => name.onChange(e)}
                    onBlur={e => name.onBlur(e)}
                    value={name.value}
                    type="text"
                    name="name"
                    validError={name.isDirty && (name.minLengthError || name.maxLengthError)}
                />

                <Input
                    placeholder=''
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
