import React from 'react';


function useValidation(value, validations) {
    const [minLengthError, setMinLengthError] = React.useState(false)
    const [maxLengthError, setMaxLengthError] = React.useState(false)
    const [emailError, setEmailError] = React.useState(false)
    const [inputValid, setInputValid] = React.useState(false)
    const [noEmpty, setNoEmpty] = React.useState(false)
    const [isEmpty, setEmpty] = React.useState(false)

    React.useEffect(() => {
        for (const validation in validations) {
            // eslint-disable-next-line default-case
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ?
                        setMinLengthError(true) : setMinLengthError(false)

                    break;
                case 'maxLength':
                    value.length > validations[validation] ?
                        setMaxLengthError(true) : setMaxLengthError(false)

                    break;

                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;

                case 'noEmpty':
                    (value.length > 0) && (value.length < validations[validation]) ? setNoEmpty(true) : setNoEmpty(false)
                    break;

                case 'empty':
                    value.length === 0 ? setEmpty(true) : setEmpty(false)
                    break;
            }
        }
    }, [validations, value])

    React.useEffect(() => {
        if (minLengthError || maxLengthError || emailError || isEmpty) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [minLengthError, maxLengthError, emailError, isEmpty])

    return {
        minLengthError,
        maxLengthError,
        emailError,
        inputValid,
        isEmpty,
        noEmpty
    }
}

export default useValidation;