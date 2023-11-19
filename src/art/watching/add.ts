import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"
import { ArtId } from "../type"

/**
 * 今見ている作品を追加する。
 * @param userId 今見ていると設定するユーザのID
 * @param artId 今見ている作品のID
 */
export const addWatchingArt = async (userId: UserId, artId: ArtId): Promise<void> => {
    await prisma.watchingArt.create({
        data: {
            artId,
            userId,
        }
    })
}
