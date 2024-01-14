"use server"

import { ArtId } from "@/art/type"
import { addWatchingArt } from "@/art/watching/add"
import { getSession } from "@/auth/server/auth"
import { notImplementError } from "@/util/notImplement"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const handleAddWatchingArt = async (artId: ArtId) => {
    const session = await getSession()
    if (!session) {
        throw notImplementError(`ログインする必要があります。`)
    }
    await addWatchingArt(session.user.id, artId)
    revalidatePath(`/user/${session.user.id}`)
    redirect(`/settings/watching-arts`)
}
