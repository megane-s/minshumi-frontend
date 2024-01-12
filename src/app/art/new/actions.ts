"use server"

import { createArt } from "@/art/create";
import { CreateArtParams } from "@/art/type";
import { redirect } from "next/navigation";
import { setLastCreatedArtId } from "../[art_id]/cookie";

export const handleCreateArt = async (params: CreateArtParams) => {
    const newArt = await createArt(params)
    setLastCreatedArtId(newArt.artId)
    redirect(`/art/${newArt.artId}`)
}
