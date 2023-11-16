import "server-only"

import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        }),
    ],
    callbacks: {
        session: ({ session, user }) => {
            if (session.user) {
                session.user.id = user.id
            }
            return session
        },
    }
}
