"use server"

import { Art, ArtId } from "@/art/type"
import { updateArt } from "@/art/update"

export const handleSaveArtDetail = async (artId: ArtId, input: Partial<Art>) => {
    return await updateArt(artId, input)
}
