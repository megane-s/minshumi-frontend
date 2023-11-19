import { prisma } from "@/prisma"
import "server-only"
import { User, UserId } from "../type"

/**
 * 指定したユーザのフォロワー（指定したユーザをフォローしているユーザ）を取得する。
 * @param userId 指定するユーザ。
 * @returns userIdで指定したユーザをフォローしているユーザの一覧。
 */
export const getFollowers = async (userId: UserId): Promise<User[]> => {
    const results = await prisma.follower.findMany({
        where: { followerId: userId },
        include: { user: true },
    })
    return results.map(result => result.user)
}
