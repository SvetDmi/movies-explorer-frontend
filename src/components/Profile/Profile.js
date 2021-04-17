import React from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useInput from '../../utils/Hooks/useInput';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ERROR_EDIT_PROFILE, ERROR_NAME, ERROR_EMAIL } from '../../utils/errorsMessages'


function Profile({ onLogout, onEditUser, serverError }) {

    const currentUser = React.useContext(CurrentUserContext);
    const name = useInput('', { minLength: 2, maxLength: 30 });
    const email = useInput('', { isEmail: true });

    const [sameName, setSameName] = React.useState(false);
    const [sameEmail, setSameEmail] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onEditUser({ name: name.value, email: email.value })
    }

    React.useEffect(() => {
        if (name.value === currentUser.name) {
            setSameName(true);
        }
        if (email.value === currentUser.email) {
            setSameEmail(true)
        }
    }, [name, email])


    return (
        <section className="page__section_white">
            <Form
                sort="profile"
                formTitle={`Привет, ${currentUser.name}`}
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
                    variant="profile"
                    placeholder={currentUser.name}
                    label="Имя"
                    onChange={e => name.onChange(e)}
                    onBlur={e => name.onBlur(e)}
                    value={name.value}
                    type="text"
                    name="name"
                    errorMessage={sameName ? ERROR_EDIT_PROFILE : ERROR_NAME}
                    validError={name.isDirty && (name.minLengthError || name.maxLengthError || sameName)}
                />

                <Input
                    variant="profile"
                    placeholder={currentUser.email}
                    label="Почта"
                    onChange={e => email.onChange(e)}
                    onBlur={e => email.onBlur(e)}
                    value={email.value}
                    name='email'
                    type='text'
                    errorMessage={sameEmail ? ERROR_EDIT_PROFILE : ERROR_EMAIL}
                    validError={email.isDirty && (email.emailError || sameEmail)}
                />
            </Form>

        </section>
    )
}

export default Profile;
