// auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Facebook from "next-auth/providers/facebook"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "email public_profile",
                },
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl

            if (
                pathname.startsWith("/dashboard") ||
                pathname.startsWith("/create") ||
                pathname.startsWith("/todos")
            ) {
                return !!auth
            }

            if (pathname === "/" && auth) {
                return Response.redirect(new URL("/dashboard", request.url))
            }

            return true
        },
    },
})
