'use client'

import { useState, useEffect } from 'react'
import Background from '@/components/Background'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SearchPublication from '@/components/SearchPublication'
import {
    Box,
    Button,
    Container,
    Grid,
    List,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material'
import Link from 'next/link'

const getPublications = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/db/books/list`,
        { next: { revalidate: 60 } }
    )

    const publications = await response.json()

    return publications.sort((a, b) => new Date(b.data) - new Date(a.data))
}

const PublicationCard = ({ data }) => {
    return (
        <Grid item xs={12} md={6}>
            <Stack spacing={4}>
                <Typography>Автор - {data?.author || ''}</Typography>
                <Typography variant="h6" align="center">
                    {data?.title || ''}
                </Typography>
                <Typography
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: '3',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {data?.annotation || ''}
                </Typography>
                <Button
                    fullWidth
                    variant="outlined"
                    LinkComponent={Link}
                    href={`/science/${data?.id}`}
                >
                    Читати далі
                </Button>
            </Stack>
        </Grid>
    )
}

const directions = [
    'виконання держбюджетних і госпрозрахункових науково-дослідних робіт і провадження науково-прикладних розробок з питань агротехнологій;',
    'підготовка та публікація наукових праць (монографій, статей, тез доповідей тощо) у провідних вітчизняних і закордонних виданнях;',
    'організація і проведення щорічних міжнародної науково-практичної конференції і всеукраїнської наукової інтернет-конференції з проблем вищої освіти і науки;',
    'наукове стажування і підвищення кваліфікації професорсько-викладацького складу кафедри в навчальних закладах в Україні та за кордоном;',
    'патентно-ліцензійна діяльність у частині отримання свідоцтв про реєстрацію авторського права на твір;',
    'участь викладачів кафедри в наукових конференціях і семінарах різних рівнів;',
    'наукове співробітництво з провідними науковими й освітніми закладами, підприємствами й організаціями різних організаційно-правових форм, форм власності і видів економічної діяльності; консультування закордонних і вітчизняних бізнес-структур з широкого кола економічних і правових питань;',
    'керівництво НДР студентів із залученням талановитої молоді до наукової роботи через участь у наукових гуртках, конференціях, конкурсах, предметних олімпіадах тощо.',
]

export default function Science() {
    const [publications, setPublications] = useState([])
    const [visibleCount, setVisibleCount] = useState(4)

    useEffect(() => {
        const fetchPublications = async () => {
            const pubs = await getPublications()
            setPublications(pubs)
        }

        fetchPublications()
    }, [])

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 4)
    }

    return (
        <>
            <Header />
            <Background />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    fontSize: 42,
                }}
            >
                <Container maxWidth="lg">
                    <Box component="section">
                        <Box
                            position="relative"
                            display="flex"
                            flexDirection="column"
                            gap={4}
                            my={3}
                        >
                            <Box
                                component="img"
                                src="/science/greeting.png"
                                maxWidth="100%"
                                minHeight="340px"
                                sx={{
                                    objectFit: 'cover',
                                    position: 'relative',
                                }}
                                borderRadius={5}
                                border="1px solid black"
                            />
                            <Typography
                                sx={{
                                    position: 'absolute',
                                    top: { xs: 20, sm: 40, md: 80 },
                                    right: 20,
                                    maxWidth: { xs: '90%', sm: '50%' },
                                    textAlign: 'end',
                                }}
                            >
                                Наукова робота є невід&apos;ємною складовою
                                діяльності Кафедри агроінформаційних технологій.
                                Наші дослідження спрямовані на інтеграцію
                                сучасних інформаційних технологій у аграрний
                                сектор для підвищення ефективності та стійкості
                                сільськогосподарського виробництва
                            </Typography>
                            <Typography variant="h5">
                                Основні напрями наукової роботи кафедри:
                            </Typography>
                            <List>
                                {directions.map((direction) => (
                                    <ListItemText key={direction}>
                                        – {direction}
                                    </ListItemText>
                                ))}
                            </List>
                        </Box>
                    </Box>
                    <Typography py={4} variant="h4" align="center">
                        Наші наукові{' '}
                        <Typography
                            component="span"
                            variant="inherit"
                            color="primary.dark"
                        >
                            здобудки
                        </Typography>
                    </Typography>
                    <Grid container component="section" spacing={4}>
                        {Array.isArray(publications) &&
                            publications
                                .slice(0, visibleCount)
                                .map((publication) => (
                                    <PublicationCard
                                        key={publication.id}
                                        data={publication}
                                    />
                                ))}
                    </Grid>
                    <Box display="flex" justifyContent="center" py={4}>
                        <Button
                            variant="contained"
                            onClick={loadMore}
                            disabled={visibleCount >= publications.length}
                        >
                            Завантажити ще
                        </Button>
                    </Box>

                    <Grid container spacing={4} py={5} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography>
                                Для пошуку необхідної{' '}
                                <Typography
                                    component="span"
                                    color="primary.dark"
                                >
                                    інформації
                                </Typography>{' '}
                                скористайтеся віконцем
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SearchPublication />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
