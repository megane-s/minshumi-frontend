import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"
import { ArtId } from "../type"

/**
 * 作品へのいいねをキャンセルする
 * @param artId いいねをキャンセルする作品のID
 * @param by いいねしたユーザのID
 */
export const cancelGoodToArt = async (artId: ArtId, by: UserId): Promise<void> => {
    await prisma.artGoodUser.delete({
        where: { artId_userId: { artId, userId: by } },
    })
}
