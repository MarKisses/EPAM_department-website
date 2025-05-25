'use client'

import React, { useEffect, useState } from 'react'
import { CssBaseline, Box, Typography, Paper, Button } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DownloadIcon from '@mui/icons-material/Download'
import EditIcon from '@mui/icons-material/Edit'
import theme from '@/app/theme.js'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'

export default function ScienceWork({ params: { id } }) {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [publication, setPublication] = useState({})
    const baseurl = `${process.env.NEXT_PUBLIC_BASE_URL}`

    const getPublication = async () => {
        try {
            const response = await fetch(`${baseurl}api/db/books/${id}`)
            setPublication(await response.json())
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        getPublication()
    }, [])

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    }

    const handleEditClick = () => {
        // Button logic "Редагувати"
    }

    const buttons = [
        {
            label: 'НАЗАД',
            icon: <ArrowBackIcon />,
            backgroundColor: theme.palette.primary.extraLight,
            color: 'black',
            url: '/admin/science',
        },
        {
            label: 'РЕДАГУВАТИ',
            icon: <EditIcon />,
            url: `/admin/science/${id}/edit`,
        },
    ]

    return (
        <AdminLayout
            pageTitle="Наукова робота"
            buttons={buttons}
            handleDrawerToggle={handleDrawerToggle}
        >
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            color: theme.palette.primary.main,
                            mb: 4,
                        }}
                    >
                        {publication.title}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 1,
                            mb: 4,
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ color: theme.palette.primary.main }}
                        >
                            <Box
                                component="strong"
                                sx={{
                                    textTransform: 'uppercase',
                                    color: theme.palette.black,
                                }}
                            >
                                Автор:
                            </Box>{' '}
                            {publication.author}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: theme.palette.primary.main }}
                        >
                            <Box
                                component="strong"
                                sx={{
                                    textTransform: 'uppercase',
                                    color: theme.palette.black,
                                }}
                            >
                                Категорія:
                            </Box>{' '}
                            {publication.category}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: theme.palette.primary.main }}
                        >
                            <Box
                                component="strong"
                                sx={{
                                    textTransform: 'uppercase',
                                    color: theme.palette.black,
                                }}
                            >
                                Дата публікації:
                            </Box>{' '}
                            {publication.data}
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'justify' }}>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {publication.annotation}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            color: theme.palette.primary.main,
                        }}
                    >
                        {publication.pdf
                            ? `Завантажено файл "${'NAME.PDF'}"`
                            : `Файл не завантажено`}
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            width: '100%',
                            maxWidth: 325,
                        }}
                        href={`data:application/pdf;base64,${publication.pdf}`}
                        download="name.pdf"
                        disabled={!publication.pdf}
                    >
                        Завантажити повний текст
                    </Button>
                </Box>
            </Box>
        </AdminLayout>
    )
}
