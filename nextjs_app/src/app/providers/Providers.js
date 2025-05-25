'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <ThemeProvider theme={theme}>
                <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}
