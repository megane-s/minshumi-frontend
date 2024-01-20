"use server"

import { updateArtTags } from "@/art/tag/update"
import { ArtId, ArtTag } from "@/art/type"
import { getSession } from "@/auth/server/auth"
import { notImplementError } from "@/util/notImplement"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const handleSaveArtTags = async (
    artId: ArtId,
    { medias, genres, others, originals }: { medias: ArtTag[], genres: ArtTag[], others: ArtTag[], originals: ArtTag[] },
) => {
    const session = await getSession()
    if (!session) throw notImplementError(`ログインする必要があります。`)
    await updateArtTags(artId, session.user.id, { medias, genres, others, originals })

    revalidatePath(`/art/${artId}`)
    redirect(`/art/${artId}`)
}
