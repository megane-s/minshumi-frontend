import "server-only"

import { prisma } from "@/prisma"
import { ArtId, ArtTag, ArtTagType } from "../type"

/**
 * 作品にタグを追加する。
 * @param artId タグを追加する作品のID
 * @param tags 追加するタグ。複数指定可能。
 * @returns 追加したタグの一覧。
 */
export const addTagToArt = async (artId: ArtId, ...tags: ({ tag: ArtTag, tagType: ArtTagType })[]): Promise<ArtTag[]> => {
    const result = await prisma.$transaction(tags.map(tag =>
        prisma.artTag.upsert({
            where: { artId_tag: { artId, ...tag } },
            create: { artId, ...tag },
            update: { artId, ...tag },
        })
    ))
    return result.map(res => res.tag)
}
