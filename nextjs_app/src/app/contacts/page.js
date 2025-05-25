'use client'
import Background from '@/components/Background'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import {
    Input,
    TextField,
    Button,
    FormControl,
    FormLabel,
    Box,
    Grid,
    Container,
    Typography,
    Link,
} from '@mui/material'
import { useState, useRef } from 'react'

const NameValidatedTextField = ({
    name,
    validator,
    onChange,
    value,
    setValue,
    minChars,
    maxChars,
}) => {
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const newValue = e.target.value
            .replace(/^\s+/g, '')
            .replace(/\s{2,}/g, ' ')

        const errorMessage = validator(newValue, minChars, maxChars)

        if (errorMessage === 'SymbolError') {
            setError('Некоректні символи')
        } else if (errorMessage === 'MinLengthError') {
            setError("Ім'я повинно мати довжину не менше 2-х символів")
            setValue(newValue)
        } else if (errorMessage === 'MaxLengthError') {
            setError("Ім'я повинно мати довжину не більше 50-ти символів")
        } else {
            setError(errorMessage)
            setValue(newValue)
        }
        onChange(!errorMessage)
    }
    return (
        <TextField
            name={name}
            value={value}
            onChange={handleChange}
            error={!!error}
            helperText={error}
        />
    )
}

const EmailValidatedTextField = ({
    name,
    validator,
    onChange,
    value,
    setValue,
    emailValidity,
    setEmailValid,
    minChars,
    maxChars,
}) => {
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const newValue = e.target.value
        const errorMessage = validator(newValue, minChars, maxChars)

        if (errorMessage === 'SymbolError') {
            setError('Уведіть правильну адресу електронної пошти')
            setValue(newValue)
        } else if (errorMessage === 'MinLengthError') {
            setError('Email адреса повинна мати довжину не менше 5-ти символів')
            setValue(newValue)
        } else if (errorMessage === 'MaxLengthError') {
            setError(
                'Email адреса повинна мати довжину не більше 100-та символів'
            )
        } else {
            setError(errorMessage)
            setValue(newValue)
        }

        onChange(!errorMessage)
        setEmailValid(true)
    }
    return (
        <TextField
            name={name}
            value={value}
            onChange={handleChange}
            error={!!error || (emailValidity ? false : true)}
            helperText={
                error ||
                (emailValidity
                    ? ''
                    : 'Уведіть правильну адресу електронної пошти')
            }
        />
    )
}

const MessageValidatedTextField = ({
    name,
    validator,
    onChange,
    value,
    setValue,
    minChars,
    maxChars,
}) => {
    const [error, setError] = useState(false)
    const remainingChars = value ? maxChars - value.length : maxChars

    const handleChange = (e) => {
        const newValue = e.target.value
        const errorMessage = validator(newValue, minChars, maxChars)
        if (errorMessage === 'SymbolError') {
            setError('Некоректні символи')
        } else if (errorMessage === 'MinLengthError') {
            setError(
                `Повідомлення повинно мати довжину не менше ${minChars}-ти символів`
            )
            setValue(newValue)
        } else if (errorMessage === 'MaxLengthError') {
            setError(
                `Повідомлення повинно мати довжину не більше ${maxChars}-ти символів`
            )
        } else {
            setError(errorMessage)
            setValue(newValue)
        }
        onChange(!errorMessage)
    }

    return (
        <TextField
            name={name}
            value={value}
            onChange={handleChange}
            error={!!error}
            helperText={error ? error : `${remainingChars}/${maxChars}`}
            minRows={4}
            maxRows={10}
            multiline
            variant="outlined"
        />
    )
}

const nameValidator = (value, minChars, maxChars) => {
    if (value.length < minChars) return 'MinLengthError'
    if (value.length > maxChars) return 'MaxLengthError'
    if (!/^[a-zA-Zа-яА-ЯіїєґІЇЄҐЁё\-'0-9,\s]+$/.test(value))
        return 'SymbolError'
    return false
}

const emailValidator = (value, minChars, maxChars) => {
    if (value.length < minChars) return 'MinLengthError'
    if (value.length > maxChars) return 'MaxLengthError'
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
        return 'SymbolError'
    return false
}

const messageValidator = (value, minChars, maxChars) => {
    if (value.length < minChars) return 'MinLengthError'
    if (value.length > maxChars) return 'MaxLengthError'
    if (!/^[a-zA-Zа-яА-ЯіїєґІЇЄҐЁё'0-9,:.;()?\p{Pd}\n\r! ]+$/u.test(value))
        return 'SymbolError'
    return false
}

const Form = () => {
    const formValid = useRef({ name: false, email: false, message: false })
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        adress: '',
    })
    const [emailValid, setEmailValid] = useState(true)

    let ifFormisValid = Object.values(formValid.current).every(
        (isValid) => isValid
    )

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/verify-email/${formValues.email}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
        const emailExists = await response.json()

        if (!emailExists.valid) {
            setEmailValid(false)
            formValid.current.email = false
            return
        }

        if (Object.values(formValid.current).every((isValid) => isValid)) {
            setFormValues({
                name: '',
                email: '',
                message: '',
            })
            formValid.current = { name: false, email: false, message: false }
            setEmailValid(true)
            alert('Форма успішно відправлена!')
        } else {
            alert('Невалідна форма!')
        }
    }

    return (
        <>
            <Typography component="h3" variant="h3" textAlign="center">
                Написати нам
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Box display="flex" flexDirection="column" gap={3}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        sx={{ maxWidth: { sm: '100%', md: '70%', lg: '50%' } }}
                        gap={3}
                    >
                        <Box display="flex" flexDirection="column">
                            <FormLabel required={true}>Ім&apos;я</FormLabel>
                            <NameValidatedTextField
                                name="name"
                                validator={nameValidator}
                                onChange={(isValid) =>
                                    (formValid.current.name = isValid)
                                }
                                value={formValues.name}
                                setValue={(value) =>
                                    setFormValues({
                                        ...formValues,
                                        name: value,
                                    })
                                }
                                minChars={2}
                                maxChars={50}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <FormLabel required={true}>Email</FormLabel>
                            <EmailValidatedTextField
                                name="email"
                                validator={emailValidator}
                                onChange={(isValid) =>
                                    (formValid.current.email = isValid)
                                }
                                value={formValues.email}
                                setValue={(value) =>
                                    setFormValues({
                                        ...formValues,
                                        email: value,
                                    })
                                }
                                emailValidity={emailValid}
                                setEmailValid={setEmailValid}
                                minChars={5}
                                maxChars={100}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <FormLabel required={true}>Повідомлення</FormLabel>
                        <MessageValidatedTextField
                            name="message"
                            validator={messageValidator}
                            onChange={(isValid) =>
                                (formValid.current.message = isValid)
                            }
                            value={formValues.message}
                            setValue={(value) =>
                                setFormValues({ ...formValues, message: value })
                            }
                            minChars={10}
                            maxChars={2000}
                        />
                    </Box>
                    <Box maxWidth={200}>
                        <Button
                            {...(ifFormisValid
                                ? { disabled: false }
                                : { disabled: true })}
                            fullWidth
                            variant="contained"
                            type="submit"
                        >
                            Надіслати
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

const ContactsGrid = () => {
    return (
        <>
            <Typography component="h2" variant="h3">
                Контакти
            </Typography>
            <Box>
                <Typography fontSize="24px">Адреса:</Typography>
                <Typography>
                    Бориславський лісовий університет, 21000, м. Борислав, вул.
                    Незалежності 40
                </Typography>
            </Box>
            <Box>
                <Typography fontSize="24px">Пошта:</Typography>
                <Link
                    href="mailto:agro.tech@bluniv.edu.ua"
                    color="primary.dark"
                >
                    <Typography>agro.tech@bluniv.edu.ua</Typography>
                </Link>
            </Box>
            <Box>
                <Typography fontSize="24px">Телефон:</Typography>
                <Link href="tel:+380 50 123 4567" color="primary.dark">
                    <Typography>+380 50 123 4567</Typography>
                </Link>
            </Box>
        </>
    )
}

const GoogleMapFrame = () => {
    return (
        <>
            <div style={{ width: '100%' }}>
                <iframe
                    width="100%"
                    height="600"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Boryslav,%20Lviv%20Oblast,%2082300+(%D0%A1%D0%A8%20%E2%84%967)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
            </div>
        </>
    )
}

export default function Contacts() {
    return (
        <>
            <Background />
            <Header />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    fontSize: 42,
                }}
            >
                <Container maxWidth="xl">
                    <Grid
                        container
                        component="section"
                        spacing={4}
                        sx={{ my: { xs: 1, md: 3 } }}
                        alignItems="strech"
                    >
                        <Grid
                            item
                            md={4}
                            xs={12}
                            display="flex"
                            flexDirection="column"
                            sx={{ gap: { xs: 2, md: 4 } }}
                        >
                            <ContactsGrid />
                        </Grid>
                        <Grid
                            item
                            md={8}
                            xs={12}
                            display="flex"
                            flexDirection="column"
                        >
                            <Form />
                        </Grid>
                    </Grid>
                    <GoogleMapFrame />
                </Container>
            </Box>
            <Footer />
        </>
    )
}
