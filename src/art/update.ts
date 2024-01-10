import { UserId } from '@/user/type';
import "server-only";

import { prisma } from "@/prisma";
import { z } from "zod";
import { Art, ArtId, ArtSchema } from "./type";

export const UpdateArtParamsSchema = ArtSchema.partial()
export type UpdateArtParams = z.infer<typeof UpdateArtParamsSchema>

/**
 * 作品を更新する。
 * @param artId 更新対象の作品のID。
 * @param art 更新内容。
 * @returns 更新後の作品。
 */
export const updateArt = async (artId: ArtId, art: UpdateArtParams): Promise<Art> => {
    const result = await prisma.art.update({
        where: { artId: artId },
        data: art,
    })
    return result
}

export const canUpdateArt = async (by: UserId, prevArt: Art, input: UpdateArtParams) => {
    // タイトルは作成者以外変更できない
    if (input.title && by !== prevArt.userId) {
        return false
    }
    return true
}
