'use client'

import React from 'react'
import { Box, keyframes } from '@mui/material'
import theme from '../app/theme'

const pulse = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
`

const Loader = () => {
    return (<Box
        sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            animation: `${pulse} 1.5s infinite ease-in-out`,
        }}
    />)
}

export default Loader