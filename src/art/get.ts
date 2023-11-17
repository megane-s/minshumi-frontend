import "server-only";

import { prisma } from "@/prisma";
import { ArtSchema } from "@/prisma/generated";
import { z } from "zod";

export const GetArtSchemaSchema = z.object({
    artId: ArtSchema.shape.artId,
})
export type GetArtSchema = z.infer<typeof GetArtSchemaSchema>

export const getArt = async (params: GetArtSchema) => {
    const art = await prisma.art.findFirst({
        where: { artId: params.artId },
    })
    return art
}
