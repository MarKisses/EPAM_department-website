'use client'

import React, { useState, useEffect } from 'react'
import {
    CssBaseline, useMediaQuery,
} from '@mui/material'

import theme from '@/app/theme.js'
import AdminLayout from '@/components/admin/AdminLayout'

export default function Team() {

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    return (<AdminLayout pageTitle="Контакти">
        <CssBaseline />
    </AdminLayout>)
}