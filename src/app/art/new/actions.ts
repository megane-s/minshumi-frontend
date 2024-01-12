"use server"

import { createArt } from "@/art/create"
import { CreateArtParams } from "@/art/type"
import { redirect } from "next/navigation"

export const handleCreateArt = async (params: CreateArtParams) => {
    const newArt = await createArt(params)
    redirect(`/art/${newArt.artId}`)
}
