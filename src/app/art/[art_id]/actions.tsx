"use server"

import { cancelGoodToArt } from "@/art/good/cancel"
import { goodToArt } from "@/art/good/good"
import { ArtId } from "@/art/type"
import { getSession } from "@/auth/server/auth"
import { serverAction } from "@/util/serverAction"
import { redirect } from "next/navigation"
import { clearLastCreatedArtId } from "./cookie"


export const handleGood = serverAction(async (artId: ArtId) => {
    // ユーザIDを取得
    const session = await getSession()
    if (!session) {
        // ログインしていない時
        throw new Error(`ログインしていません`)
    }
    const userId = session.user.id

    await goodToArt(artId, userId)
})

export const handleCancelGood = serverAction(async (artId: ArtId) => {
    // ユーザIDを取得
    const session = await getSession()
    if (!session) {
        // ログインしていない時
        throw new Error(`ログインしていません`)
    }
    const userId = session.user.id

    await cancelGoodToArt(artId, userId)
})

export const handleGotoAppeal = (artId: ArtId) => {
    clearLastCreatedArtId()
    redirect(`/art/${artId}/appeal`)
}