import React from 'react'
import { Box, IconButton, Typography, Button, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import theme from '@/app/theme.js'

const Header = ({ handleDrawerToggle, pageTitle, buttons = [] }) => {
    return (
        <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography
                    variant="h4"
                    sx={{
                        color: theme.palette.primary.main,
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}
                >
                    {pageTitle}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, color: theme.palette.primary.main }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        color: theme.palette.primary.main,
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}
                >
                    МЕНЮ
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                {buttons.map((button, index) =>
                    button.url ? (
                        <Link key={index} href={button.url} passHref>
                            <Button
                                variant="contained"
                                startIcon={button.icon}
                                sx={{
                                    backgroundColor:
                                        button.backgroundColor ||
                                        theme.palette.primary.main,
                                    color: button.color || 'white',
                                    textTransform: 'uppercase',
                                    fontWeight: '600',
                                }}
                                component="a"
                            >
                                {button.label}
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            key={index}
                            variant="contained"
                            startIcon={button.icon}
                            sx={{
                                backgroundColor:
                                    button.backgroundColor ||
                                    theme.palette.primary.main,
                                color: button.color || 'white',
                                textTransform: 'uppercase',
                                fontWeight: '600',
                            }}
                            onClick={button.onClick}
                            type={button.type || 'button'}
                        >
                            {button.label}
                        </Button>
                    )
                )}
            </Box>
        </>
    )
}

export default Header
