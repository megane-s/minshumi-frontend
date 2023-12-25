"use server"

import { getSession } from "@/auth/server/auth"
import { firstRegister } from "@/user/firstRegister"
import { FirstRegisterInput } from "@/user/type"

export const handleFirstRegister = async (input: FirstRegisterInput) => {
    const session = await getSession()
    if (!session) throw new Error(`ログインする必要があります。`)
    await firstRegister(session.user.id, input)
}
