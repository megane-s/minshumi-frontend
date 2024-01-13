import "server-only"

import { getServerSession } from "next-auth"
import { cache } from "react"
import { options } from "./options"

export const getSession = cache(async () => {
    return await getServerSession(options)
})
