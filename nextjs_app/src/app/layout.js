import Providers from './providers/Providers'
import { Box, CssBaseline } from '@mui/material'

export const metadata = {
    title: 'Boryslav University',
    description: 'Website of the Department of Agroinformation Technologies of Boryslav Forestry University',
    keywords: 'Cool, Best, Very Good, Appropriate, Hell yeah, Diabolical'
}

export default function RootLayout({ children }) {
    return (
        <html lang="uk">
            <head>
            <link rel="icon" href="/logo.svg" sizes="any" />
            </head>
            <body>
                <CssBaseline />
                <Providers>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100vh',
                            minWidth: '100%',
                        }}
                    >
                        {children}
                    </Box>
                </Providers>
            </body>
        </html>
    )
}
