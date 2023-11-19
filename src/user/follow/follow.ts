import { prisma } from "@/prisma"
import "server-only"
import { UserId } from "../type"

/**
 * 他のユーザをフォローする。
 * @param by フォロー操作をするユーザのID。
 * @param followUser フォロー対象のユーザのID。
 */
export const follow = async (by: UserId, followUser: UserId): Promise<void> => {
    await prisma.follower.create({
        data: {
            userId: by,
            followerId: followUser,
        },
    })
}
