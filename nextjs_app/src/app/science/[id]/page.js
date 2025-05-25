import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const getPublication = async (id) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/db/books/${id}`,
        { next: { revalidate: 60 } }
    )

    return response.json()
}

export default async function Publication({ params: { id } }) {
    const publication = await getPublication(id)

    if (publication.error) {
        return notFound()
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
                    <Stack spacing={6} my={4}>
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            <Button
                                variant="outlined"
                                LinkComponent={Link}
                                href="/science"
                            >
                                Повернутись назад
                            </Button>
                        </Box>
                        <Typography variant="h6">
                            Перегляд публікації
                        </Typography>
                        <Stack direction="row" spacing={4} fontStyle="italic">
                            <Typography>Автор: {publication.author}</Typography>
                            <Typography>
                                Дата публікації: {publication.data}
                            </Typography>
                        </Stack>
                        <Typography
                            variant="h6"
                            component="h1"
                            align="center"
                            fontStyle="italic"
                        >
                            {publication.title}
                        </Typography>
                        <Typography fontStyle="italic">
                            Категорія: {publication.category}
                        </Typography>
                        <Typography>{publication.annotation}</Typography>
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            <Button
                                href={`data:application/pdf;base64,${publication.pdf}`}
                                variant="contained"
                                download="paper.pdf"
                                disabled={!publication.pdf}
                            >
                                Завантажити увесь текст
                            </Button>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
