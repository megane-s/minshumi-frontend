import { prisma } from "@/prisma"
import "server-only"
import { UserId } from "../type"
import { sendFollowNotification } from "@/notification/send"

/**
 * 他のユーザをフォローする。
 * @param by フォロー操作をするユーザのID。
 * @param followUserId フォロー対象のユーザのID。
 */
export const follow = async (by: UserId, followUserId: UserId): Promise<void> => {
    await prisma.follower.create({
        data: {
            userId: followUserId,
            followerId: by,
        },
    })
    await sendFollowNotification({
        followByUserId: by,
        targetUserId: followUserId,
    })
}
