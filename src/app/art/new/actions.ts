"use server"

import { createArt } from "@/art/create";
import { CreateArtParams } from "@/art/type";
import { getSession } from "@/auth/server/auth";
import { notImplementError } from "@/util/notImplement";
import { redirect } from "next/navigation";
import { setLastCreatedArtId } from "../[art_id]/cookie";

export const handleCreateArt = async (params: CreateArtParams) => {
    const session = await getSession()
    if (!session) throw notImplementError("作品の登録にはログインが必要です。")
    const newArt = await createArt(session.user.id, params)
    setLastCreatedArtId(newArt.artId)
    redirect(`/art/${newArt.artId}`)
}
