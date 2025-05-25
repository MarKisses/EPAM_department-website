'use client'

import { Box, Button, Container, Paper, Typography } from '@mui/material'
import React, { useState, Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTheme } from '@emotion/react'
import { styled } from '@mui/system'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

const LoginContent = () => {
    const theme = useTheme()
    const [containerMinHeight, setContainerMinHeight] = useState('100vh')

    const router = useRouter()
    const session = useSession()

    if (session.status === 'authenticated') {
        router.push('/admin')
    }

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
                                В доступі відмовлено
                            </Typography>
                            <Typography>
                                Зверніться до адміністратору сайту
                            </Typography>

                            <Button
                                variant="contained"
                                LinkComponent={Link}
                                href="/"
                            >
                                На головну
                            </Button>
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
