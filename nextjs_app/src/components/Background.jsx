import { Box, Container } from '@mui/material'

const Background = ({ maxWidth }) => {
    return (
        <Box
            sx={{
                bgcolor: '#fff',
                position: 'absolute',
                overflow: 'hidden',
                height: '100vh',
                width: '100%',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: -1,
            }}
        >
            <Container
                maxWidth={maxWidth}
                sx={{ position: 'relative', height: '100%' }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width: '890px',
                        minHeight: '890px',
                        top: '-200px',
                        right: '-250px',
                        bgcolor: '#EDFBDB',
                        borderRadius: '50%',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        width: '890px',
                        minHeight: '890px',
                        top: '-200px',
                        right: '-350px',
                        bgcolor: '#BAF6BD',
                        borderRadius: '50%',
                    }}
                />
            </Container>
        </Box>
    )
}
export default Background
