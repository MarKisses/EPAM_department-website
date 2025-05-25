import { useState } from 'react'
import { TextField } from '@mui/material'

export const AnnotationValidatedTextField = ({
    name,
    validator,
    onChange,
    value,
    setValue,
    minChars,
    maxChars,
    label,
    defaultValue,
}) => {
    const [error, setError] = useState(false)
    const [edited, setEdited] = useState(false)

    let remainingChars
    if (!edited && defaultValue) {
        remainingChars = maxChars - defaultValue.length
    } else if (value) {
        remainingChars = maxChars - value.length
    } else {
        remainingChars = maxChars
    }

    const handleChange = (e) => {
        setEdited(true)

        const newValue = e.target.value

        const errorMessage = validator(newValue, minChars, maxChars)

        if (errorMessage === 'SymbolError') {
            setError('Некоректні символи')
        } else if (errorMessage === 'MinLengthError') {
            setError(`Анотація повинна мати не менше ${minChars}-х символів`)
            setValue(newValue)
        } else if (errorMessage === 'MaxLengthError') {
            setError(`Анотація повинна мати не більше ${maxChars}-ти символів`)
        } else {
            setError(errorMessage)
            setValue(newValue)
        }
        onChange(!errorMessage)
    }
    return (
        <TextField
            name={name}
            value={edited ? value : defaultValue}
            onChange={handleChange}
            error={!!error}
            helperText={error ? error : `${remainingChars}/${maxChars}`}
            label={label}
            required
            multiline
            fullWidth
            rows={10}
            inputProps={{ style: { resize: 'vertical' } }}
        />
    )
}

export const annotationValidator = (value, minChars, maxChars) => {
    if (value.length < minChars) return 'MinLengthError'
    if (value.length > maxChars) return 'MaxLengthError'
    if (!/^[a-zA-Zа-яА-ЯіїєґІЇЄҐЁё'0-9,:.;()?\p{Pd}\n\r ]+$/u.test(value))
        return 'SymbolError'
    return false
}
