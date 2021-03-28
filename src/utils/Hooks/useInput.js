import React from 'react';
import useValidation from './useValidation'

function useInput(initialValue, validations) {
    const [value, setValue] = React.useState(initialValue)
    const [isDirty, setDirty] = React.useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        setDirty(true)
    }

    return {
        value,
        isDirty,
        onChange,
        onBlur,
        ...valid
    }
}

export default useInput;