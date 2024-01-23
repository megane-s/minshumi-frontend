import "server-only"

import { prisma } from "@/prisma"
import { Art, ArtTag } from "../type"

/**
 * 指定したタグが設定されている作品一覧を取得する。
 * @param tag 指定するタグ。
 * @returns タグが設定されている作品一覧。
 */
export const getArtsWithTag = async (tag: ArtTag): Promise<Art[]> => {
    const results = await prisma.artTag.findMany({
        where: { tag },
        include: {
            art: true,
        },
        take: 30, // TODO
    })
    return results.map(result =>
        result.art
    )
}

export const getTagArtsCount = async (tag: ArtTag) => {
    const results = await prisma.artTag.count({
        where: { tag },
    })
    return results
}
