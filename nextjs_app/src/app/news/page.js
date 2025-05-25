import Background from '@/components/Background'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'

const cards = [
    {
        img: '/news/card-1.png',
        date: 'липень 20, 2024',
        title: 'Відкриття нової лабораторії смарт-фермерства',
        abstract:
            'Кафедра агроінформаційних технологій урочисто відкрила нову лабораторію смарт-фермерства, оснащену найсучаснішими технологіями...',
    },
    {
        img: '/news/card-2.png',
        date: 'липень 19, 2024',
        title: 'Співпраця з міжнародним центром сільськогосподарських досліджень',
        abstract:
            'Кафедра агроінформаційних технологій уклала меморандум про співпрацю з Міжнародним центром сільськогосподарських досліджень...',
    },
    {
        img: '/news/card-3.png',
        date: 'липень 18, 2024',
        title: 'Перемога в національному конкурсі інноваційних проектів',
        abstract:
            ' Команда студентів кафедри агроінформаційних технологій здобула перемогу в національному конкурсі інноваційних проектів "АгроІнновації-2024"...',
    },
    {
        img: '/news/card-4.png',
        date: 'липень 17, 2024',
        title: 'Організація міжнародної конференції "цифрові технології в Агрономії" ',
        abstract:
            'Кафедра агроінформаційних технологій організувала конференцію...',
    },
]

const NewsCard = (card) => {
    return (
        <>
            <Grid item xs={12} md={4} alignItems="center">
                <Box
                    width="100%"
                    height="100%"
                    component="img"
                    alt=""
                    src={card.img}
                    sx={{ objectFit: 'cover' }}
                ></Box>
            </Grid>
            <Grid item xs={12} md={8} display="flex">
                <Stack flexGrow={1} spacing={2}>
                    <Typography variant="caption">{card.date}</Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {card.title}
                    </Typography>
                    <Typography>{card.abstract}</Typography>

                    <Button sx={{ alignSelf: 'center' }} variant="outlined">
                        Читати далі
                    </Button>
                </Stack>
            </Grid>
        </>
    )
}

export default function News() {
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
                    <Grid
                        mt={2}
                        container
                        component="section"
                        spacing={4}
                        alignItems="stretch"
                    >
                        <Grid item xs={12}>
                            <Typography
                                component="h1"
                                variant="h4"
                                align="center"
                            >
                                Шановна Марія Іванівна!
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={7}
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            sx={{ my: 2 }}
                        >
                            <Typography variant="h5">
                                Вітаємо із захистом дисертації!
                            </Typography>
                            <Typography>
                                Від щирого серця вітаємо Вас із успішним
                                захистом дисертації! Це важливе досягнення є
                                результатом вашої наполегливої праці, відданості
                                науковим дослідженням та невпинного прагнення до
                                знань. Ваш внесок у розвиток агроінформаційних
                                технологій є неоціненним, і ми пишаємося тим, що
                                ви є частиною нашої команди. Бажаємо вам
                                подальших наукових звершень, нових відкриттів та
                                реалізації всіх ваших професійних амбіцій. Нехай
                                ваші дослідження надихають колег і студентів, а
                                ваші наукові досягнення сприяють розвитку нашої
                                кафедри та української науки в цілому. З
                                найкращими побажаннями, Колектив Кафедри
                                агроінформаційних технологій
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Box
                                borderRadius={4}
                                component="img"
                                src="/news/greeting.png"
                                width="100%"
                                height="100%"
                                sx={{ objectFit: 'cover' }}
                            ></Box>
                        </Grid>
                    </Grid>
                    <Stack my={6}>
                        <Typography mb={6} variant="h4" align="center">
                            Новини кафедри
                        </Typography>
                        <Grid container spacing={4}>
                            {cards.map((card) => (
                                <NewsCard key={card} {...card} />
                            ))}
                        </Grid>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
