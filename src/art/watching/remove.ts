import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"
import { ArtId } from "../type"

/**
 * 今見ている作品を削除する。
 * @param userId 対象のユーザのID。
 * @param artId 削除する作品のID。
 */
export const removeWatchingArt = async (userId: UserId, artId: ArtId): Promise<void> => {
    await prisma.watchingArt.delete({
        where: { userId_artId: { userId, artId } },
    })
}
