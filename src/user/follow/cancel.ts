import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

/**
 * フォローを取り消す。
 * @param by 取り消し操作を実行するユーザのID。
 * @param followUser フォローを取り消すユーザのID。(byのフォロワーだったユーザ)
 */
export const cancelFollow = async (by: User["id"], followUser: User["id"]): Promise<void> => {
    await prisma.follower.delete({
        where: { userId_followerId: { userId: by, followerId: followUser } }
    })
}
