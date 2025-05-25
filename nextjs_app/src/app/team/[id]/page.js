import Background from '@/components/Background'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Box, Grid, Container, Button, Typography, Link } from '@mui/material'
import { notFound } from 'next/navigation'

const proffessorsCV = [
    {
        img: {
            src: '/team/professors/1.png',
            alt: "professor's picture",
        },
        contacts: {
            adress: '21000, м. Борислав, вул. Незалежності 40',
            phone: '+380 50 123 4567',
            email: 'blu@gmail.com',
        },
        about: {
            title: 'Завідувач кафедри,',
            degree: 'д.т.н., професор Іванов О.П.',
            text: [
                {
                    subtitle: "Освіта та академічна кар'єра",
                    text: 'Олександр Петрович Іванов закінчив Національний аграрний університет у 1995 році за спеціальністю "Агрономія". Свою наукову кар\'єру розпочав як аспірант на кафедрі агроінформаційних технологій, де успішно захистив кандидатську дисертацію на тему впровадження інформаційних технологій у сільському господарстві.',
                },
                {
                    subtitle: 'Наукові досягнення:',
                    text: 'Професор Іванов є автором понад 100 наукових статей та монографій, присвячених застосуванню сучасних інформаційних технологій в аграрному секторі.',
                },
                {
                    subtitle: 'Нагороди та визнання:',
                    text: 'Олександр Петрович є лауреатом численних наукових премій і нагород, серед яких Державна премія України в галузі науки і техніки. Він також активно співпрацює з міжнародними науковими установами, представляючи Україну на міжнародних конференціях та семінарах.',
                },
                {
                    subtitle: 'Особисте життя:',
                    text: 'У вільний час професор Іванов захоплюється читанням наукової фантастики та подорожами. Він активно підтримує молодих науковців, керуючи численними аспірантами та магістрами, які працюють над своїми дослідженнями під його керівництвом.',
                },
                {
                    text: 'Професор Іванов продовжує робити значний внесок у розвиток агроінформаційних технологій та підготовку нових поколінь агрономів, допомагаючи їм оволодіти сучасними знаннями та навичками.',
                },
            ],
        },
    },
    {
        img: {
            src: '/team/professors/2.png',
            alt: "professor's picture",
        },
        contacts: {
            adress: '21000, м. Борислав, вул. Незалежності 40',
            phone: '+380 50 123 4567',
            email: 'blu@gmail.com',
        },
        about: {
            title: 'Професорка кафедри,',
            degree: 'к.т.н., Іванова І.І.',
            text: [
                {
                    subtitle: "Освіта та академічна кар'єра",
                    text: 'Олександр Петрович Іванов закінчив Національний аграрний університет у 1995 році за спеціальністю "Агрономія". Свою наукову кар\'єру розпочав як аспірант на кафедрі агроінформаційних технологій, де успішно захистив кандидатську дисертацію на тему впровадження інформаційних технологій у сільському господарстві.',
                },
                {
                    subtitle: 'Наукові досягнення:',
                    text: 'Професор Іванов є автором понад 100 наукових статей та монографій, присвячених застосуванню сучасних інформаційних технологій в аграрному секторі.',
                },
                {
                    subtitle: 'Нагороди та визнання:',
                    text: 'Олександр Петрович є лауреатом численних наукових премій і нагород, серед яких Державна премія України в галузі науки і техніки. Він також активно співпрацює з міжнародними науковими установами, представляючи Україну на міжнародних конференціях та семінарах.',
                },
                {
                    subtitle: 'Особисте життя:',
                    text: 'У вільний час професор Іванов захоплюється читанням наукової фантастики та подорожами. Він активно підтримує молодих науковців, керуючи численними аспірантами та магістрами, які працюють над своїми дослідженнями під його керівництвом.',
                },
                {
                    text: 'Професор Іванов продовжує робити значний внесок у розвиток агроінформаційних технологій та підготовку нових поколінь агрономів, допомагаючи їм оволодіти сучасними знаннями та навичками.',
                },
            ],
        },
    },
    {
        img: {
            src: '/team/professors/3.png',
            alt: "professor's picture",
        },
        contacts: {
            adress: '21000, м. Борислав, вул. Незалежності 40',
            phone: '+380 50 123 4567',
            email: 'blu@gmail.com',
        },
        about: {
            title: 'Ще одна професорка кафедри,',
            degree: 'к.т.н., Іванова І.І.',
            text: [
                {
                    subtitle: "Освіта та академічна кар'єра",
                    text: 'Олександр Петрович Іванов закінчив Національний аграрний університет у 1995 році за спеціальністю "Агрономія". Свою наукову кар\'єру розпочав як аспірант на кафедрі агроінформаційних технологій, де успішно захистив кандидатську дисертацію на тему впровадження інформаційних технологій у сільському господарстві.',
                },
                {
                    subtitle: 'Наукові досягнення:',
                    text: 'Професор Іванов є автором понад 100 наукових статей та монографій, присвячених застосуванню сучасних інформаційних технологій в аграрному секторі.',
                },
                {
                    subtitle: 'Нагороди та визнання:',
                    text: 'Олександр Петрович є лауреатом численних наукових премій і нагород, серед яких Державна премія України в галузі науки і техніки. Він також активно співпрацює з міжнародними науковими установами, представляючи Україну на міжнародних конференціях та семінарах.',
                },
                {
                    subtitle: 'Особисте життя:',
                    text: 'У вільний час професор Іванов захоплюється читанням наукової фантастики та подорожами. Він активно підтримує молодих науковців, керуючи численними аспірантами та магістрами, які працюють над своїми дослідженнями під його керівництвом.',
                },
                {
                    text: 'Професор Іванов продовжує робити значний внесок у розвиток агроінформаційних технологій та підготовку нових поколінь агрономів, допомагаючи їм оволодіти сучасними знаннями та навичками.',
                },
            ],
        },
    },
]

const MainPhoto = ({ professor }) => {
    return (
        <Box
            component="img"
            alt={professor.img?.alt}
            src={professor.img?.src}
            width="100%"
            height="100%"
            sx={{ objectFit: 'cover', px: { md: 6 }, py: { xs: 2, md: 4 } }}
        />
    )
}

const Contacts = ({ professor }) => {
    return (
        <Box display="flex" gap={2} flexDirection="column">
            <Box>
                <Typography fontSize="24px">Адреса:</Typography>
                <Typography>{professor?.contacts?.adress}</Typography>
            </Box>
            <Box>
                <Typography fontSize="24px">Телефон:</Typography>
                <Link href={`tel:${professor?.contacts?.phone}`}>
                    <Typography>{professor?.contacts?.phone}</Typography>
                </Link>
            </Box>
            <Box>
                <Typography fontSize="24px">Електронна адреса:</Typography>
                <Link href={`mailto:${professor?.contacts?.email}`}>
                    <Typography>{professor?.contacts?.email}</Typography>
                </Link>
            </Box>
        </Box>
    )
}

const Info = ({ professor }) => {
    let id = 1

    return (
        <Box display="flex" gap={3} flexDirection="column">
            <Box>
                <Typography
                    variant="h6"
                    color="rgba(58, 184, 4, 1)"
                    sx={{ flexGrow: 1 }}
                >
                    {professor.about?.title}
                </Typography>
                <Typography variant="h6">{professor.about?.degree}</Typography>
            </Box>
            {professor.about?.text?.map((paragraph) => (
                <Box key={id++}>
                    <Typography color="rgba(58, 184, 4, 1)">
                        {paragraph.subtitle}
                    </Typography>
                    <Typography key={id++}>{paragraph.text}</Typography>
                </Box>
            ))}
        </Box>
    )
}

const Buttons = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            alignItems="center"
            sx={{ mb: 2 }}
        >
            <Box>
                <Button variant="outlined">Список публікацій</Button>
            </Box>
            <Box>
                <Button variant="outlined">
                    Посилання на профіль в Google Scholar
                </Button>
            </Box>
            <Box>
                <Button variant="outlined">
                    Посилання на профіль в Scopus
                </Button>
            </Box>
        </Box>
    )
}

export default function ProfessorAbout({ params }) {
    const professor = proffessorsCV[params.id - 1]

    if (!professor) {
        notFound()
    }

    return (
        <>
            <Background />
            <Header />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    fontsize: 42,
                }}
            >
                <Container maxWidth="xl">
                    <Grid
                        container
                        component="section"
                        spacing={7}
                        sx={{ mt: { xs: 9, md: 12 }, mb: { xs: 9, md: 12 } }}
                        alignItems="stretch"
                    >
                        <Grid
                            item
                            xs={12}
                            md={6}
                            display="flex"
                            flexDirection="column"
                        >
                            <MainPhoto professor={professor} />
                            <Buttons />
                            <Typography
                                fontSize="24px"
                                textAlign="center"
                                variant="h6"
                            >
                                Контакти
                            </Typography>
                            <Contacts professor={professor} />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            display="flex"
                            flexDirection="column"
                        >
                            <Info professor={professor} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
