import "server-only"

import { prisma } from "@/prisma"
import { Art, ArtTag } from "@prisma/client"

/**
 * 指定したタグが設定されている作品一覧を取得する。
 * @param tag 指定するタグ。
 * @returns タグが設定されている作品一覧。
 */
export const getArtsWithTag = async (tag: ArtTag["tag"]): Promise<Art[]> => {
    const results = await prisma.artTag.findMany({
        where: { tag },
        include: {
            art: true,
        }
    })
    return results.map(result =>
        result.art
    )
}
