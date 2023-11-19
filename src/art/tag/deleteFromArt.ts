import "server-only"

import { prisma } from "@/prisma"
import { ArtId, ArtTag } from "../type"

/**
 * 作品からタグを削除する。
 * @param artId 対象の作品のID。
 * @param tag 削除するタグ。
 */
export const deleteTagFromArt = async (artId: ArtId, tag: ArtTag): Promise<void> => {
    await prisma.artTag.delete({
        where: { artId_tag: { artId, tag } },
    })
}
