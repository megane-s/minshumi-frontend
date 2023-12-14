import { prisma } from "@/prisma"
import "server-only"
import { UserId } from "../type"

/**
 * フォローを取り消す。
 * @param by 取り消し操作を実行するユーザのID。
 * @param followUser フォローを取り消すユーザのID。(byのフォロワーだったユーザ)
 */
export const cancelFollow = async (by: UserId, followUser: UserId): Promise<void> => {
    console.log(by, followUser)
    await prisma.follower.delete({
        where: { userId_followerId: { userId: by, followerId: followUser } }
    })
}
