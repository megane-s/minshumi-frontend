import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

/**
 * 他のユーザをフォローする。
 * @param by フォロー操作をするユーザのID。
 * @param followUser フォロー対象のユーザのID。
 */
export const follow = async (by: User["id"], followUser: User["id"]): Promise<void> => {
    await prisma.follower.create({
        data: {
            userId: by,
            followerId: followUser,
        },
    })
}
