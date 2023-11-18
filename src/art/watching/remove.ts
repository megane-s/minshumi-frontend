import { prisma } from "@/prisma"
import { Art, User } from "@prisma/client"
import "server-only"

/**
 * 今見ている作品を削除する。
 * @param userId 対象のユーザのID。
 * @param artId 削除する作品のID。
 */
export const removeWatchingArt = async (userId: User["id"], artId: Art["artId"]): Promise<void> => {
    await prisma.watchingArt.delete({
        where: { userId_artId: { userId, artId } },
    })
}
