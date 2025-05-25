'use client'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    Box, CssBaseline, useMediaQuery,
} from '@mui/material'
import Loader from '../Loader'
import SideMenu from './SideMenu'
import Header from './Header'
import theme from '@/app/theme.js'

const drawerWidth = 240
const drawerBreakpoint = 900

export default function AdminLayout({ children, pageTitle, buttons }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [loading, setLoading] = useState(true)
    const isSmallScreen = useMediaQuery('(max-width:900px)')

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setIsMobile(isSmallScreen)
                setMobileOpen(!isSmallScreen)
            }
        }

        if (typeof window !== 'undefined') {
            setIsMobile(isSmallScreen)
            setMobileOpen(!isSmallScreen)
            window.addEventListener('resize', handleResize)
        }

        setTimeout(() => {
            setLoading(false)
        }, 1500) // Увеличиваем время загрузки до 1.5 секунд

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [isSmallScreen])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    if (loading) {
        return (<Box
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            }}
        >
            <Loader />
        </Box>)
    }

    return (<Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SideMenu mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} />
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                p: 3,
                transition: 'margin-left 0.3s',
                marginLeft: mobileOpen && !isMobile ? `${drawerWidth}px` : '0',
            }}
        >
            <Header pageTitle={pageTitle} buttons={buttons} handleDrawerToggle={handleDrawerToggle} />
            {children}
        </Box>
    </Box>)
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired, pageTitle: PropTypes.string.isRequired,
}