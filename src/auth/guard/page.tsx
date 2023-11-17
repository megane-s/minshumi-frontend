import "server-only"

import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"

export interface Options {
    onNotLogin: Partial<{
        notFound: true
        redirectTo: string
    }>
}
export const requireAuthPage = async (options: Partial<Options> = {}) => {
    const session = await getServerSession()
    if (!session) {
        const onNotLogin = options.onNotLogin ?? { notFound: true }
        if (onNotLogin.notFound) {
            notFound()
        } else if (onNotLogin.redirectTo) {
            redirect(onNotLogin.redirectTo)
        }
    }
    return session
}
