'use client'

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Stack,
    Typography,
} from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useTheme } from '@emotion/react'
import Background from '@/components/Background'

const cards = [
    {
        img: '/home/card-1.png',
        date: 'Липень 10, 2024',
        title: 'Співпраця з міжнародними університетами',
        abstract:
            'Кафедра агроінформаційних технологій Бориславського лісового університету організувала семінар на тему "Сучасні технології в агробізнесі". На заході виступили провідні експерти з аграрної...',
    },
    {
        img: '/home/card-2.png',
        date: 'Липень 10, 2024',
        title: 'Семінар "Сучасні технології в агробізнесі"',
        abstract:
            'Кафедра агроінформаційних технологій Бориславського лісового університету організувала семінар на тему "Сучасні технології в агробізнесі". На заході виступили провідні експерти з аграрної...',
    },
    {
        img: '/home/card-3.png',
        date: 'Липень 10, 2024',
        title: 'Відкриття нової лабораторії в польових умовах',
        abstract:
            'Кафедра агроінформаційних технологій Бориславського лісового університету організувала семінар на тему "Сучасні технології в агробізнесі". На заході виступили провідні експерти з аграрної...',
    },
]
const NewsCard = (card) => {
    return (
        <Card elevation={0} sx={{ padding: 0, height: '100%' }}>
            <CardContent sx={{ height: '100%', p: 0 }}>
                <Stack spacing={1} sx={{ display: 'flex', height: '100%' }}>
                    <CardMedia component="img" image={card.img} />
                    <Typography variant="caption">{card.date}</Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {card.title}
                    </Typography>
                    <Typography>{card.abstract}</Typography>
                    <CardActions>
                        <Button fullWidth variant="outlined">
                            Читати далі
                        </Button>
                    </CardActions>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default function Home() {
    const theme = useTheme()
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
                <Container maxWidth="lg">
                    <Grid
                        container
                        component="section"
                        spacing={3}
                        alignItems="stretch"
                    >
                        <Grid
                            item
                            xs={12}
                            md={7}
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            sx={{ my: 2 }}
                            order={{ xs: 1, md: 0 }}
                        >
                            <Typography component="h2" variant="h3">
                                Вітаємо у світі сучасних{' '}
                                <span
                                    style={{
                                        color: theme.palette.primary.dark,
                                    }}
                                >
                                    аграрних
                                </span>{' '}
                                технологій!
                            </Typography>
                            <Typography>
                                Кафедра агроінформаційних технологій є сучасним
                                центром освіти і наукових досліджень у сфері
                                застосування інформаційних технологій в
                                аграрному секторі.
                            </Typography>
                            <Typography>
                                Наші студенти отримують не тільки фундаментальні
                                знання в галузі агрономії та інформаційних
                                технологій, але й набувають практичних навичок,
                                необхідних для успішної кар&apos;єри в сучасному
                                аграрному світі.
                            </Typography>
                            <Typography>
                                Запрошуємо вас ознайомитися з нашими освітніми
                                програмами, науковими дослідженнями та
                                досягненнями. Ми завжди відкриті до співпраці та
                                нових ідей. Приєднуйтесь до нас, щоб разом
                                створювати майбутнє агроінформаційних
                                технологій!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5} order={{ xs: 0, md: 1 }}>
                            <Box
                                borderRadius={4}
                                component="img"
                                src="/home/greeting.png"
                                width="100%"
                                height="100%"
                                sx={{ objectFit: 'cover' }}
                            ></Box>
                        </Grid>
                    </Grid>
                    <Box component="section">
                        <Typography variant="h3" align="center" sx={{ py: 8 }}>
                            Наші актуальні{' '}
                            <span
                                style={{
                                    color: theme.palette.primary.dark,
                                }}
                            >
                                новини
                            </span>{' '}
                        </Typography>
                        <Grid container spacing={2}>
                            {cards.map((card) => (
                                <Grid
                                    key={card.title}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <NewsCard {...card} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
