'use server'

import { VerifaliaRestClient } from 'verifalia'

export default async function EmailVerifier({ email }) {
    const verifalia = new VerifaliaRestClient({
        username: process.env.VERIFALIA_USER,
        password: process.env.VERIFALIA_PASS,
    })

    try {
        const response = await verifalia.emailValidations.submit(email)
        const status = response.entries[0].status
        return status === 'Success'
    } catch (error) {
        console.error(
            'Failed to connect with email verification service',
            error
        )
        return false
    }
}
