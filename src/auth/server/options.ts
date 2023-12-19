import "server-only";

import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
    secret: process.env._NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env._GOOGLE_AUTH_CLIENT_ID as string,
            clientSecret: process.env._GOOGLE_AUTH_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        }),
    ],
    session: { strategy: "database" },
    callbacks: {
        session: ({ session, user }) => {
            if (session.user) {
                session.user.id = user.id
            }
            return session
        },
    },
}
