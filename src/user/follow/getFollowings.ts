import { prisma } from "@/prisma"
import "server-only"
import { User, UserId } from "../type"

/**
 * 指定したユーザがフォローしているユーザ一覧を取得する。
 * @param userId 指定するユーザ。
 * @returns userIdで指定したユーザがフォローしているユーザの一覧。
 */
export const getFollowings = async (userId: UserId): Promise<User[]> => {
    const results = await prisma.follower.findMany({
        where: { userId: userId },
        include: { user: true },
    })
    return results.map(result => result.user)
}
