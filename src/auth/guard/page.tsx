import "server-only"

import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

export const requireAuthPage = async () => {
    const session = await getServerSession()
    if (!session) {
        notFound()
    }
    return session
}
