import { prisma } from "@/prisma"
import { Art, User } from "@prisma/client"
import "server-only"

/**
 * 今見ている作品を追加する。
 * @param userId 今見ていると設定するユーザのID
 * @param artId 今見ている作品のID
 */
export const addWatchingArt = async (userId: User["id"], artId: Art["artId"]): Promise<void> => {
    await prisma.watchingArt.create({
        data: {
            artId,
            userId,
        }
    })
}
