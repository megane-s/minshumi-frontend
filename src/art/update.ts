import "server-only";

import { prisma } from "@/prisma";
import { ArtSchema } from "@/prisma/generated";
import { Art } from "@prisma/client";
import { z } from "zod";

export const UpdateArtParamsSchema = ArtSchema.partial()
export type UpdateArtParams = z.infer<typeof UpdateArtParamsSchema>

/**
 * 作品を更新する。
 * @param artId 更新対象の作品のID。
 * @param art 更新内容。
 * @returns 更新後の作品。
 */
export const updateArt = async (artId: Art["artId"], art: UpdateArtParams): Promise<Art> => {
    const result = await prisma.art.update({
        where: { artId: artId },
        data: art,
    })
    return result
}
