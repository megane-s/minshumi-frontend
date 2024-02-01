import "server-only"

import { prisma } from "@/prisma"
import { FindOptions } from "@/util/server/findUtil"
import { Art, ArtTag } from "../type"

/**
 * 指定したタグが設定されている作品一覧を取得する。
 * @param tag 指定するタグ。
 * @returns タグが設定されている作品一覧。
 */
export const getArtsWithTag = async (tag: ArtTag, options: FindOptions = {}): Promise<Art[]> => {
    const results = await prisma.artTag.findMany({
        where: { tag },
        include: {
            art: true,
        },
        skip: options.offset ?? 0,
        take: options.limit ?? 30,
        orderBy: {
            art: { updateAt: "desc" },
        },
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

export const getArtsWithTagCount = async (tag: ArtTag) => {
    return await prisma.artTag.count({
        where: { tag },
    })
}
