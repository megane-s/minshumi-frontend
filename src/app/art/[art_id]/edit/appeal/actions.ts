"use server"

import { updateArtAppeal } from "@/art/appeal/update"
import { InputRelatedArt } from "@/art/newArtSession/type"
import { updateRelatedArt } from "@/art/related/update"
import { ArtId } from "@/art/type"
import { getSession } from "@/auth/server/auth"
import { notImplementError } from "@/util/notImplement"

export const handleSaveAppeal = async (
    artId: ArtId,
    input: {
        likePoint: string,
        prevArts: InputRelatedArt[],
        nextArts: InputRelatedArt[],
    },
) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしないとArtAppealを更新できません")
    const userId = session.user.id
    await updateArtAppeal(artId, userId, { likePoint: input.likePoint })
    await updateRelatedArt(artId, userId, {
        prevArts: input.prevArts,
        nextArts: input.nextArts,
    })
}
