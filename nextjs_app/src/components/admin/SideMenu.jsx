import React from 'react'
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Toolbar,
    Typography,
    Avatar,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import theme from '../../app/theme.js'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const menuItems = [
    { text: 'ГОЛОВНА', url: '/admin/' },
    { text: 'ПРО КАФЕДРУ', url: '/admin/team' },
    { text: 'НАУКОВА РОБОТА', url: '/admin/science' },
    { text: 'НОВИНИ', url: '/admin/news' },
    { text: 'КОНТАКТИ', url: '/admin/contacts' },
    { text: 'ПРОФІЛЬ', url: '/admin/profile' },
    { text: 'ВИЙТИ', url: '/admin/logout' },
]

const SideMenu = ({ mobileOpen, handleDrawerToggle, isMobile }) => {
    const drawer = (
        <div>
            <Toolbar>
                {/*<Avatar*/}
                {/*    src="/logo.svg"*/}
                {/*    sx={{*/}
                {/*        mt: '1rem',*/}
                {/*        width: { xs: 120, md: 192 },*/}
                {/*        height: { xs: 120, md: 192 },*/}
                {/*    }}*/}
                {/*/>*/}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link href="/" passHref>
                        <Avatar
                            src="/logo.svg"
                            sx={{
                                mt: '1rem',
                                width: { xs: 120, md: 192 },
                                height: { xs: 120, md: 192 },
                                cursor: 'pointer', // Добавляем курсор указателя, чтобы было понятно, что это ссылка
                            }}
                        />
                    </Link>
                </Box>
                {isMobile && (
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            color: 'white',
                            position: 'absolute',
                            right: 16,
                            top: 16,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </Toolbar>
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={
                                    item.text !== 'ВИЙТИ'
                                        ? item.url
                                        : '/admin/#'
                                }
                                onClick={item.text === 'ВИЙТИ' && signOut}
                                sx={{
                                    padding: '20px 20px',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor:
                                            theme.palette.primary.main,
                                        color: theme.palette.admin.yellow,
                                    },
                                    '&:hover .MuiTypography-root': {
                                        color: theme.palette.admin.yellow,
                                    },
                                    '&:before, &:after': {
                                        content: '""',
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        backgroundColor:
                                            theme.palette.admin.yellow,
                                        transform: 'scaleX(0)',
                                        transition:
                                            'transform 0.3s ease-in-out',
                                    },
                                    '&:before': {
                                        top: 0,
                                        transformOrigin: 'left',
                                    },
                                    '&:after': {
                                        bottom: 0,
                                        transformOrigin: 'right',
                                    },
                                    '&:hover:before': {
                                        transform: 'scaleX(1)',
                                    },
                                    '&:hover:after': {
                                        transform: 'scaleX(1)',
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    )

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'persistent'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 240,
                    backgroundColor: theme.palette.primary.main,
                    boxSizing: 'border-box',
                    ...(isMobile && { position: 'fixed' }),
                },
            }}
        >
            {drawer}
        </Drawer>
    )
}

export default SideMenu
