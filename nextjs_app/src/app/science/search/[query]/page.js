'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SearchPublication from '@/components/SearchPublication'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Results({ params: { query } }) {
    const [results, setResults] = useState([])
    const router = useRouter()
    const baseurl = `${process.env.NEXT_PUBLIC_BASE_URL}`
    const handleSearch = async () => {
        try {
            const responseByCategory = await fetch(
                `${baseurl}api/db/books/search?category=${query}`
            )
            const categoryData = await responseByCategory.json()

            const responseByTitle = await fetch(
                `${baseurl}api/db/books/search?title=${query}`
            )
            const titleData = await responseByTitle.json()

            const responseByAnnotation = await fetch(
                `${baseurl}api/db/books/search?annotation=${query}`
            )
            const annotationData = await responseByAnnotation.json()

            const combinedResults = [
                ...categoryData,
                ...titleData,
                ...annotationData,
            ]

            const uniqueResults = []
            const ids = new Set()

            combinedResults.forEach((article) => {
                if (!ids.has(article.id)) {
                    ids.add(article.id)
                    uniqueResults.push(article)
                }
            })

            setResults(uniqueResults)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        handleSearch()
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
                    <Stack spacing={6}>
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            <Button variant="outlined" onClick={router.back}>
                                Повернутись назад
                            </Button>
                        </Box>
                        <Typography variant="h6">Результати пошуку</Typography>
                        <Typography>
                            За пошуковим запитом &quot;{decodeURI(query)}&quot;
                            було знайдено {results.length} результат(ів)
                        </Typography>
                        <Stack spacing={6} maxWidth={800}>
                            <SearchPublication />
                            {results.length > 0
                                ? results.map((data) => (
                                      <Stack spacing={4} key={data.id}>
                                          <Typography>
                                              Автор - {data?.author || ''}
                                          </Typography>
                                          <Typography
                                              variant="h6"
                                              align="center"
                                          >
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
                                  ))
                                : null}
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </>
    )
}
