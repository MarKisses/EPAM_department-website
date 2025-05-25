import { NextResponse } from 'next/server'
import { VerifaliaRestClient } from 'verifalia'

const verifalia = new VerifaliaRestClient({
    username: process.env.VERIFALIA_USER,
    password: process.env.VERIFALIA_PASS,
})

export async function GET(request, { params: { email } }) {

    if (!email) {
        return NextResponse.json(
            { error: 'Email is required' },
            { status: 400 }
        )
    }

    try {
        const result = await verifalia.emailValidations.submit(email)
        const status = result.entries[0].status
        if (status === 'Success') {
            return NextResponse.json({ valid: true }, { status: 200 })
        } else {
            return NextResponse.json({ valid: false }, { status: 200 })
        }
    } catch (error) {
        console.error(
            'Failed to connect with email verification service',
            error
        )
        return NextResponse.json(
            { error: 'Problem with email verifier service' },
            { status: 500 }
        )
    }
}
