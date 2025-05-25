'use client'

import { Menu } from '@mui/icons-material'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Toolbar,
    Typography,
    Link as MuiLink,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    useScrollTrigger,
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { cloneElement, useEffect, useRef, useState } from 'react'

function ElevationScroll(props) {
    const { children, window, color } = props
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    })

    if (color === 'transparent') {
        return cloneElement(children, {
            elevation: trigger ? 4 : 0,
            color: trigger ? 'inherit' : 'transparent',
        })
    } else {
        return cloneElement(children, {
            elevation: 4,
            color: color,
        })
    }
}

export default function Header() {
    const [open, setOpen] = useState(false)
    const path = usePathname()
    const appBarRef = useRef(null)
    const [appBarHeight, setAppBarHeight] = useState(0)
    const session = useSession()

    const isActive = (url) => {
        return url === path
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const links = [
        { text: 'Головна', url: '/' },
        { text: 'Про кафедру', url: '/team' },
        { text: 'Наукова робота', url: '/science' },
        { text: 'Новини', url: '/news' },
        { text: 'Контакти', url: '/contacts' },
    ]

    useEffect(() => {
        const updateAppBarHeight = () => {
            if (appBarRef.current) {
                setAppBarHeight(appBarRef.current.clientHeight)
            }
        }

        updateAppBarHeight()
        window.addEventListener('resize', updateAppBarHeight)
        return () => {
            window.removeEventListener('resize', updateAppBarHeight)
        }
    }, [appBarRef])

    return (
        <Box component="header">
            <ElevationScroll color="transparent">
                <AppBar color="transparent" elevation={0} ref={appBarRef}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters sx={{ py: 1 }}>
                            <Grid container alignItems="center">
                                <Grid item xs={8} md={10} lg={5}>
                                    <MuiLink
                                        variant="body1"
                                        underline="hover"
                                        href="/"
                                        color="text.primary"
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                    >
                                        <Avatar
                                            src="/logo.svg"
                                            sx={{
                                                width: { xs: 56, md: 76 },
                                                height: { xs: 56, md: 76 },
                                            }}
                                        />

                                        <Typography
                                            maxWidth={350}
                                            sx={{
                                                fontSize: {
                                                    xs: '0.75rem',
                                                    md: 'unset',
                                                },
                                            }}
                                        >
                                            Кафедра агроінформаційних технологій
                                            Бориславського лісового університету
                                        </Typography>
                                    </MuiLink>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sx={{
                                        display: { xs: 'none', lg: 'flex' },
                                        gap: 1,
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    {links.map((link) => (
                                        <Button
                                            key={link.url}
                                            LinkComponent={Link}
                                            href={link.url}
                                            variant={
                                                isActive(link.url)
                                                    ? 'outlined'
                                                    : 'text'
                                            }
                                        >
                                            {link.text}
                                        </Button>
                                    ))}
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    md={2}
                                    lg={1}
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        LinkComponent={Link}
                                        href={
                                            session?.status === 'authenticated'
                                                ? '/admin'
                                                : '/admin/login'
                                        }
                                    >
                                        {session?.data ? 'Кабінет' : 'Вхід'}
                                    </Button>
                                    <IconButton
                                        onClick={handleOpen}
                                        sx={{
                                            display: { xs: 'flex', lg: 'none' },
                                        }}
                                    >
                                        <Menu />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Toolbar>
                        {open ? (
                            <Drawer
                                anchor="top"
                                open={open}
                                onClose={handleClose}
                            >
                                <List>
                                    {links.map((link) => (
                                        <ListItem key={link.name}>
                                            <ListItemButton
                                                LinkComponent={Link}
                                                href={link.url}
                                                selected={isActive(link.url)}
                                            >
                                                {link.text}
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Drawer>
                        ) : null}
                    </Container>
                </AppBar>
            </ElevationScroll>
            <Box sx={{ height: appBarHeight }} />
        </Box>
    )
}
