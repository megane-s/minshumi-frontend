import "server-only"

import { prisma } from "@/prisma"
import { ArtId, ArtTag } from "../type"

/**
 * 指定した作品に設定されているタグ一覧を取得する。
 * @param artId 指定する作品。
 * @returns その作品に設定されているタグ一覧。
 */
export const getTags = async (artId: ArtId): Promise<ArtTag[]> => {
    const results = await prisma.artTag.findMany({
        where: { artId },
    })
    return results.map(result =>
        result.tag
    )
}
