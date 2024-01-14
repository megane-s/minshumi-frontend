"use server"

import { getSession } from "@/auth/server/auth"
import { UpdateUserParams, updateUser } from "@/user/update"
import { notImplementError } from "@/util/notImplement"

export const handleSaveUserSettings = async (input: UpdateUserParams) => {
    const session = await getSession()
    if (!session) {
        throw notImplementError(`ログインしてください`)
    }
    await updateUser(session.user.id, input)
}
