import "server-only"

import { getServerSession } from "next-auth"
import { options } from "./options"

export const getSession = async () => {
    return await getServerSession(options)
}
