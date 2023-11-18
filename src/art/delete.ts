import "server-only";

import { prisma } from "@/prisma";
import { ArtSchema } from "@/prisma/generated";
import { Art } from "@prisma/client";
import { z } from "zod";

export const DeleteArtParamsSchema = z.object({
    artId: ArtSchema.shape.artId,
})
export type DeleteArtParams = z.infer<typeof DeleteArtParamsSchema>

export const deleteArt = async (params: DeleteArtParams): Promise<Art> => {
    const result = await prisma.art.delete({
        where: { artId: params.artId },
    })
    return result
}
