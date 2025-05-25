'use client'

import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import React, { useRef, useState, useEffect, Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTheme } from '@emotion/react'
import { styled } from '@mui/system'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'min-height 0.2s ease',
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: theme.spacing(2),
    },
    minWidth: '200px',
    width: '100%',
}))

const GoogleButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    backgroundColor: theme.palette.primary.extraLight,
    color: theme.palette.black,
    textTransform: 'none',
    boxShadow: theme.shadows[2],
    width: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.white,
        boxShadow: theme.shadows[4],
        transition: 'all 0.3s ease',
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}))

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    alignSelf: 'flex-start',
    '& .MuiFormControlLabel-label': {
        fontWeight: 500,
    },
    transition: 'all 0.3s ease',
    '& .MuiCheckbox-root': {
        transition: 'all 0.3s ease',
    },
}))

const LoginContent = () => {
    const theme = useTheme()
    const headerRef = useRef(null)
    const footerRef = useRef(null)
    const [containerMinHeight, setContainerMinHeight] = useState('100vh')
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/admin'
    const router = useRouter()
    const session = useSession()
    const [error, setError] = useState(null)

    if (session.status === 'authenticated') {
        router.push('/admin')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const res = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        })

        if (res && !res.error) {
            router.push('/admin')
            setError(null)
        } else {
            setError('Користувача не знайдено')
        }
    }

    useEffect(() => {
        const updateContainerHeight = () => {
            const headerHeight = headerRef.current
                ? headerRef.current.offsetHeight
                : 0
            const footerHeight = footerRef.current
                ? footerRef.current.offsetHeight
                : 0
            setContainerMinHeight(
                `calc(100vh - ${headerHeight + footerHeight}px)`
            )
        }

        updateContainerHeight()

        window.addEventListener('resize', updateContainerHeight)
        return () => window.removeEventListener('resize', updateContainerHeight)
    }, [])

    return (
        <>
            <Header />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    fontSize: 42,
                }}
            >
                <Container maxWidth="lg">
                    <StyledContainer
                        maxWidth="sm"
                        sx={{ minHeight: containerMinHeight }}
                    >
                        <StyledPaper elevation={3}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{
                                    fontWeight: 500,
                                    color: theme.palette.black,
                                }}
                            >
                                Вхід в адмін-панель
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Email адреса"
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    error={!!error}
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        style: { fontWeight: 500 },
                                    }}
                                    InputProps={{ style: { fontWeight: 500 } }}
                                />
                                <TextField
                                    label="Пароль"
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        style: { fontWeight: 500 },
                                    }}
                                    InputProps={{ style: { fontWeight: 500 } }}
                                    error={!!error}
                                    helperText={error}
                                />
                                <StyledFormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label="Запам'ятати мене"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ fontWeight: 500 }}
                                >
                                    УВІЙТИ ЗА ЛОГІНОМ
                                </Button>
                            </form>
                            {/*<Typography variant="body1" component="p" sx={{ fontWeight: 600, color: theme.palette.primary.main, }}>*/}
                            {/*    АБО*/}
                            {/*</Typography>*/}
                            <GoogleButton
                                variant="filled"
                                sx={{ fontWeight: 500 }}
                                onClick={() =>
                                    signIn('google', { callbackUrl })
                                }
                            >
                                <Image
                                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                                    alt="Google logo"
                                    width={20}
                                    height={20}
                                />
                                Sign up with Google
                            </GoogleButton>
                        </StyledPaper>
                    </StyledContainer>
                </Container>
            </Box>
            <Footer />
        </>
    )
}

export default function Login() {
    return (
        <Suspense>
            <LoginContent />
        </Suspense>
    )
}
