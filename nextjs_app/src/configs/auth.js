import GoggleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { users } from '@/data/users'

const allowedUsers = ['admin@gmail.com', 'bulhakovolexii@gmail.com']

export const authConfig = {
    providers: [
        GoggleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: {
                    label: 'password',
                    type: 'password',
                    required: true,
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null

                const currentUser = users.find(
                    (user) => user.email === credentials.email
                )

                if (
                    currentUser &&
                    currentUser.password === credentials.password
                ) {
                    const { password, ...userWithoutPass } = currentUser

                    return userWithoutPass
                }

                return null
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (allowedUsers.includes(user.email)) {
                return true
            } else {
                return false
            }
        },
    },
    pages: {
        signIn: '/admin/login',
        error: '/admin/error',
    },
}
