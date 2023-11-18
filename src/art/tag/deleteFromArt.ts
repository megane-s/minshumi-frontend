import "server-only"

import { prisma } from "@/prisma"

/**
 * 作品からタグを削除する。
 * @param artId 対象の作品のID。
 * @param tag 削除するタグ。
 */
export const deleteTagFromArt = async (artId: string, tag: string): Promise<void> => {
    await prisma.artTag.delete({
        where: { artId_tag: { artId, tag } },
    })
}
