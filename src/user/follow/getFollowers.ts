import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

export const getFollowers = async (userId: User["id"]): Promise<User[]> => {
    const results = await prisma.follower.findMany({
        where: { followerId: userId },
        include: { user: true },
    })
    return results.map(result => result.user)
}
