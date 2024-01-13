"use server"

import { UpdateArtAppealParams, updateArtAppeal } from "@/art/appeal/update"
import { ArtId } from "@/art/type"
import { getSession } from "@/auth/server/auth"
import { notImplementError } from "@/util/notImplement"

export const handleAppeal = async (artId: ArtId, input: UpdateArtAppealParams) => {
    const session = await getSession()
    if (!session) throw notImplementError(`作品をアピールするにはログインする必要があります。`)
    await updateArtAppeal(artId, session.user.id, input)
}
