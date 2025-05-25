'use client'
import { Montserrat } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const montserrat = Montserrat({
    weight: ['300', '400', '500', '700', '800', '900'],
    subsets: ['cyrillic'],
    display: 'swap',
})

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#43A047',
            light: '#66BB6A',
            extraLight: '#BAF6BD',
            dark: '#2E7D32',
        },
        admin: {
            red: '#E90D0D',
            grey: '#546E7A',
            yellow: '#FFFF00',
        },
        black: '#202020',
        white: '#f3f3f3',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                outlinedPrimary: {
                    color: '#000000DE',
                },
                textPrimary: {
                    color: '#000000DE',
                },
                containedPrimary: {
                    backgroundColor: '#2E7D32',
                },
            },
        },
    },

    typography: {
        fontFamily: montserrat.style.fontFamily,
        h3: {
            fontSize: '40px',
        },
    },
})

export default theme
