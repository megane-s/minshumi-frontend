import "server-only";

import { prisma } from "@/prisma";
import { ArtSchema } from "@/prisma/generated";
import { Art } from "@prisma/client";
import { z } from "zod";

export const UpdateArtParamsSchema = ArtSchema.partial()
export type UpdateArtParams = z.infer<typeof UpdateArtParamsSchema>

export const updateArt = async (artId: Art["artId"], art: UpdateArtParams) => {
    const result = await prisma.art.update({
        where: { artId: artId },
        data: art,
    })
    return result
}
