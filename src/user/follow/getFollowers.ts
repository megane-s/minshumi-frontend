import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

/**
 * 指定したユーザのフォロワー（指定したユーザをフォローしているユーザ）を取得する。
 * @param userId 指定するユーザ。
 * @returns userIdで指定したユーザをフォローしているユーザの一覧。
 */
export const getFollowers = async (userId: User["id"]): Promise<User[]> => {
    const results = await prisma.follower.findMany({
        where: { followerId: userId },
        include: { user: true },
    })
    return results.map(result => result.user)
}
