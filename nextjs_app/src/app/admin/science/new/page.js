'use client'

import React, { useRef, useEffect, useState } from 'react'
import {
    CssBaseline,
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    TextareaAutosize,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@mui/material'
import { useMediaQuery } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DownloadIcon from '@mui/icons-material/Download'
import theme from '@/app/theme.js'
import AdminLayout from '@/components/admin/AdminLayout'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { CatchingPokemon, Done, Save } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import {
    TitleValidatedTextField,
    titleValidator,
} from '../components/titleValidatedTextField'
import {
    AuthorValidatedTextField,
    authorValidator,
} from '../components/authorValidatedTextField'
import {
    CategoryValidatedTextField,
    categoryValidator,
} from '../components/categoryValidatedTextField'
import {
    AnnotationValidatedTextField,
    annotationValidator,
} from '../components/annotationValidatedTextField'

export default function ScienceWork({ params: { id } }) {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [publication, setPublication] = useState({})
    const [successAlert, setSuccessAlert] = useState(false)
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const router = useRouter()
    const baseurl = `${process.env.NEXT_PUBLIC_BASE_URL}`

    const getPublication = async () => {
        try {
            const response = await fetch(`${baseurl}api/db/books/${id}`)
            setPublication(await response.json())
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        getPublication()
    }, [])

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    }

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0]

        if (!selectedFile) {
            setError('Завантажте коректний файл')
            setFile(null)
            return
        }

        if (selectedFile.size < 1000) {
            setError('Файл пустий')
            setFile(null)
            return
        }

        if (selectedFile.type !== 'application/pdf') {
            setError('Файл не є PDF')
            setFile(null)
            return
        }

        setError('')
        setFile(selectedFile)
    }

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                const base64String = reader.result.replace(
                    /^data:.*?;base64,/,
                    ''
                )
                resolve(base64String)
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    const formValid = useRef({
        title: false,
        author: false,
        category: false,
        annotation: false,
    })
    const [formValues, setFormValues] = useState({
        title: '',
        author: '',
        category: '',
        annotation: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!Object.values(formValid.current).every((isValid) => isValid)) {
            return
        }
        if (!file) {
            setError('Завантажте файл!')
            return
        }

        const formData = new FormData(e.currentTarget)

        const base64File = file ? await fileToBase64(file) : ''

        const publicationData = {
            author: formData.get('author'),
            data: formData.get('data'),
            category: formData.get('category'),
            title: formData.get('title'),
            annotation: formData.get('annotation'),
            pdf: base64File,
        }

        console.log(publicationData)
        try {
            const response = await fetch(`${baseurl}api/db/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(publicationData),
            })

            setSuccessAlert(true)

            setTimeout(() => {
                router.push('/admin/science')
            }, 3000)

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
        } catch (error) {
            console.error('Error submitting data:', error)
        }
    }

    const buttons = [
        {
            label: 'НАЗАД',
            icon: <ArrowBackIcon />,
            backgroundColor: theme.palette.primary.extraLight,
            color: 'black',
            url: '/admin/science',
        },
        {
            label: 'СТВОРИТИ',
            icon: <Save />,
            type: 'submit',
        },
    ]

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <AdminLayout
                pageTitle="Наукова робота"
                buttons={buttons}
                handleDrawerToggle={handleDrawerToggle}
            >
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        {/* <TextField
                            fullWidth
                            label="Назва публікації"
                            required
                            name="title"
                            defaultValue={publication.title || ''}
                        /> */}
                        <TitleValidatedTextField
                            name="title"
                            validator={titleValidator}
                            value={formValues.title}
                            onChange={(isValid) =>
                                (formValid.current.title = isValid)
                            }
                            setValue={(value) =>
                                setFormValues({
                                    ...formValues,
                                    title: value,
                                })
                            }
                            minChars={2}
                            maxChars={120}
                            label={'Назва публікації'}
                        />
                        <Box
                            display="flex"
                            width="100%"
                            gap={2}
                            flexWrap="wrap"
                        >
                            {/* <TextField
                                sx={{ flexGrow: 1 }}
                                label="Автор"
                                required
                                name="author"
                                defaultValue={publication.author || ''}
                            /> */}
                            <AuthorValidatedTextField
                                name="author"
                                validator={authorValidator}
                                value={formValues.author}
                                onChange={(isValid) =>
                                    (formValid.current.author = isValid)
                                }
                                setValue={(value) =>
                                    setFormValues({
                                        ...formValues,
                                        author: value,
                                    })
                                }
                                minChars={2}
                                maxChars={50}
                                label={'Автор'}
                            />
                            {/* <TextField
                                sx={{ flexGrow: 1 }}
                                label="Категорія"
                                required
                                name="category"
                                defaultValue={publication.category || ''}
                            /> */}
                            <CategoryValidatedTextField
                                name="category"
                                validator={categoryValidator}
                                value={formValues.category}
                                onChange={(isValid) =>
                                    (formValid.current.category = isValid)
                                }
                                setValue={(value) =>
                                    setFormValues({
                                        ...formValues,
                                        category: value,
                                    })
                                }
                                minChars={2}
                                maxChars={50}
                                label={'Категорія'}
                            />
                            <TextField
                                sx={{ flexGrow: 1 }}
                                label="Дата публікації"
                                InputLabelProps={{ shrink: true }}
                                type="date"
                                required
                                name="data"
                                defaultValue={publication.data || ''}
                            />
                        </Box>
                        {/* <TextField
                            multiline
                            fullWidth
                            rows={10}
                            inputProps={{ style: { resize: 'vertical' } }}
                            required
                            name="annotation"
                            defaultValue={publication.annotation || ''}
                        /> */}
                        <AnnotationValidatedTextField
                            name="annotation"
                            validator={annotationValidator}
                            value={formValues.annotation}
                            onChange={(isValid) =>
                                (formValid.current.annotation = isValid)
                            }
                            setValue={(value) =>
                                setFormValues({
                                    ...formValues,
                                    annotation: value,
                                })
                            }
                            minChars={10}
                            maxChars={4000}
                            label={'Вступне слово'}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                color: theme.palette.primary.main,
                            }}
                        >
                            {file
                                ? `Завантажено файл "${file.name}"`
                                : `Файл не завантажено`}
                        </Typography>
                        <input
                            accept="application/pdf"
                            id="contained-button-file"
                            multiple
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    backgroundColor: error
                                        ? 'red'
                                        : theme.palette.primary.main,
                                    color: 'white',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                    width: '100%',
                                    maxWidth: 325,
                                }}
                                component="span"
                                // color={file ? 'primary' : 'error'}
                            >
                                Завантажити повний текст
                            </Button>
                        </label>
                        {error && (
                            <Typography variant="body2" color="error" mt={1}>
                                {error}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Dialog open={successAlert}>
                    <DialogContent>
                        <DialogContentText>
                            <Typography
                                variant="h5"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Done color="success" /> Збережено
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </AdminLayout>
        </form>
    )
}
