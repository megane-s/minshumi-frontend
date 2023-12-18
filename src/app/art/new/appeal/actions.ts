"use server"

import { addLikeArt } from "@/art/addLikeArt"
import { deleteNewArtSession, getNewArtSession } from "@/art/newArtSession/cookies"
import { NewArtSessionSchema } from "@/art/newArtSession/type"
import { getSession } from "@/auth/server/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const handleCreateArt = async () => {
    const [newArtSession, userId] = await Promise.all([
        getNewArtSession().then(input => NewArtSessionSchema.parse(input)),
        getSession().then(r => r?.user.id),
    ])
    if (!userId) throw new Error(`ログインが必要な操作です`)
    if (!newArtSession) throw new Error("入力が不十分です")
    await addLikeArt(newArtSession, userId)
    await deleteNewArtSession()
    revalidatePath(`/user/${userId}`)
    redirect(`/user/${userId}`)
}
