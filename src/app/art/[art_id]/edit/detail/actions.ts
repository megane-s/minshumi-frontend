"use server"

import { getArt } from "@/art/get"
import { Art, ArtId } from "@/art/type"
import { canUpdateArt, updateArt } from "@/art/update"
import { getSession } from "@/auth/server/auth"
import { notImplementError } from "@/util/notImplement"
import { ValidationError } from "@/util/validation"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const handleSaveArtDetail = async (artId: ArtId, input: Partial<Art>) => {
    const [session, prevArt] = await Promise.all([
        getSession(),
        getArt(artId),
    ])
    if (!session) {
        throw notImplementError("ログインしていないユーザは作品を更新できません。")
    }
    if (!prevArt) {
        throw notImplementError(`存在しない作品を更新しようとしました。`)
    }
    if (!await canUpdateArt(session.user.id, prevArt, input)) {
        throw new ValidationError()
    }
    const res = await updateArt(artId, session.user.id, input)

    revalidatePath(`/art/${res.artId}`)
    redirect(`/art/${res.artId}`)
}
