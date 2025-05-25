export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/admin',
        '/admin/team',
        '/admin/science',
        '/admin/news',
        '/admin/contacts',
    ],
}
