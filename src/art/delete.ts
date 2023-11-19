import "server-only";

import { prisma } from "@/prisma";
import { Art, ArtId } from "./type";

/**
 * 作品を削除する。
 * @param artId 削除する作品のID。
 * @returns 削除した作品。
 */
export const deleteArt = async (artId: ArtId): Promise<Art> => {
    const result = await prisma.art.delete({
        where: { artId },
    })
    return result
}
