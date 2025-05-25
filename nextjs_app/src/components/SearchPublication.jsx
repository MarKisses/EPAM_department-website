'use client'

import { Box, Button, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function SearchPublication() {
    const router = useRouter()

    const handleSearch = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        router.push(`/science/search/${formData.get('query')}`)
    }

    return (
        <Box component="form" display="flex" gap={2} onSubmit={handleSearch}>
            <TextField
                fullWidth
                placeholder="Введіть назву або ключове слово"
                name="query"
            />
            <Button type="submit" variant="contained">
                Пошук
            </Button>
        </Box>
    )
}
