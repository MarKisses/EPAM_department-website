'use client'

import React, { useState, useEffect } from 'react'
import {
    CssBaseline,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    TablePagination,
    IconButton,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    Typography,
    DialogContentText,
    DialogContent,
    Box,
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Close from '@mui/icons-material/Close'

import theme from '@/app/theme.js'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { Add } from '@mui/icons-material'

export default function SciencePublications() {
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('title')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [publications, setPublications] = useState([])
    const [deletePopupOpen, setDeletePopupOpen] = useState(false)
    const [deletedPublication, setDeletedPublication] = useState({})

    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`
    // const baseUrl = 'http://localhost:8080/'

    const getPublication = async () => {
        try {
            const response = await fetch(`${baseUrl}api/db/books/list`)

            const allPublications = await response.json()

            setPublications(allPublications)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        getPublication()
    }, [])

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleDeletePublication = async (id) => {
        try {
            const response = await fetch(`${baseUrl}api/db/books/${id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                getPublication()
                toggleDeletePopup()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleDeletePopup = (id) => {
        setDeletedPublication(
            publications.find((publication) => publication?.id === id) || {}
        )
        setDeletePopupOpen(!deletePopupOpen)
    }

    const DeletePopup = ({ deletedPublication }) => {
        return (
            <Dialog open={deletePopupOpen} onClose={toggleDeletePopup}>
                <DialogTitle>
                    <Typography variant="h5" color="error">
                        Видалення публікації
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="h6" align="center">
                            Ви дійсно бажаєте видалити публікацію{' '}
                            <Typography
                                variant="inherit"
                                component="span"
                                sx={{ textDecoration: 'underline' }}
                            >
                                {deletedPublication.title}
                            </Typography>{' '}
                            автора{' '}
                            <Typography
                                variant="inherit"
                                component="span"
                                sx={{ textDecoration: 'underline' }}
                            >
                                {deletedPublication.author}
                            </Typography>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="success"
                        startIcon={<Close />}
                        onClick={toggleDeletePopup}
                    >
                        Відміна
                    </Button>
                    <Button
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() =>
                            handleDeletePublication(deletedPublication.id)
                        }
                    >
                        Видалити
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const sortedSciencePublications = [...publications].sort((a, b) => {
        if (orderBy === 'title') {
            return order === 'asc'
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title)
        } else if (orderBy === 'author') {
            return order === 'asc'
                ? a.author.localeCompare(b.author)
                : b.author.localeCompare(a.author)
        } else if (orderBy === 'category') {
            return order === 'asc'
                ? a.category.localeCompare(b.category)
                : b.category.localeCompare(a.category)
        } else if (orderBy === 'data') {
            return order === 'asc'
                ? new Date(a.data) - new Date(b.data)
                : new Date(b.data) - new Date(a.data)
        }
        return 0
    })

    const displayedSciencePublications = sortedSciencePublications.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )

    // const isSmallScreen = useMediaQuery('(max-width:600px)')
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <AdminLayout pageTitle="НАУКОВА РОБОТА">
            <CssBaseline />
            <Box width="100%" display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    LinkComponent={Link}
                    href="/admin/science/new"
                >
                    Створити
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 2, overflowX: 'auto' }}>
                <Table
                    sx={{ minWidth: isSmallScreen ? 300 : 750 }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    backgroundColor:
                                        theme.palette.primary.extraLight,
                                    color: theme.palette.black,
                                    fontWeight: 'bold',
                                    display: { xs: 'none', sm: 'table-cell' },
                                }}
                            >
                                №
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor:
                                        theme.palette.primary.extraLight,
                                    color: theme.palette.black,
                                    fontWeight: 'bold',
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === 'title'}
                                    direction={
                                        orderBy === 'title' ? order : 'asc'
                                    }
                                    onClick={() => handleRequestSort('title')}
                                >
                                    Назва публікації
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor:
                                        theme.palette.primary.extraLight,
                                    color: theme.palette.black,
                                    fontWeight: 'bold',
                                    display: { xs: 'none', sm: 'table-cell' },
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === 'author'}
                                    direction={
                                        orderBy === 'author' ? order : 'asc'
                                    }
                                    onClick={() => handleRequestSort('author')}
                                >
                                    Автор
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor:
                                        theme.palette.primary.extraLight,
                                    color: theme.palette.black,
                                    fontWeight: 'bold',
                                    display: { xs: 'none', sm: 'table-cell' },
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === 'category'}
                                    direction={
                                        orderBy === 'category' ? order : 'asc'
                                    }
                                    onClick={() =>
                                        handleRequestSort('category')
                                    }
                                >
                                    Категорія
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor:
                                        theme.palette.primary.extraLight,
                                    color: theme.palette.black,
                                    fontWeight: 'bold',
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === 'data'}
                                    direction={
                                        orderBy === 'data' ? order : 'asc'
                                    }
                                    onClick={() => handleRequestSort('data')}
                                >
                                    Дата
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor:
                                        theme.palette.primary.extraLight,
                                    color: theme.palette.black,
                                    fontWeight: 'bold',
                                }}
                            >
                                Дія
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displayedSciencePublications.map(
                            (publication, index) => (
                                <TableRow key={publication.id}>
                                    <TableCell
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'table-cell',
                                                fontWeight: 500,
                                            },
                                        }}
                                    >
                                        {index + 1 + page * rowsPerPage}
                                    </TableCell>
                                    <TableCell>
                                        <a
                                            href={`/admin/science/${publication.id}`}
                                            style={{
                                                color: theme.palette.primary
                                                    .dark,
                                                textDecoration: 'none',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {publication.title}
                                        </a>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'table-cell',
                                                fontWeight: 500,
                                            },
                                        }}
                                    >
                                        {publication.author}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'table-cell',
                                                fontWeight: 500,
                                            },
                                        }}
                                    >
                                        {publication.category}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>
                                        {publication.data}
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: isSmallScreen
                                                    ? 'column'
                                                    : 'row',
                                                gap: '0.5rem',
                                            }}
                                        >
                                            <IconButton
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor:
                                                        theme.palette.admin
                                                            .grey,
                                                    borderRadius: '4px',
                                                    width: '36px',
                                                    height: '36px',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            theme.palette.admin
                                                                .grey,
                                                        filter: 'brightness(0.85)',
                                                    },
                                                }}
                                                LinkComponent={Link}
                                                href={`/admin/science/${publication.id}/edit`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor:
                                                        theme.palette.admin.red,
                                                    borderRadius: '4px',
                                                    width: '36px',
                                                    height: '36px',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            theme.palette.admin
                                                                .red,
                                                        filter: 'brightness(0.85)',
                                                    },
                                                }}
                                                onClick={() =>
                                                    toggleDeletePopup(
                                                        publication.id
                                                    )
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={publications.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <DeletePopup deletedPublication={deletedPublication} />
            </TableContainer>
        </AdminLayout>
    )
}
