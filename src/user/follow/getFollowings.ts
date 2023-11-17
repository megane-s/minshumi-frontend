import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

export const getFollowings = async (userId: User["id"]): Promise<User[]> => {
    const results = await prisma.follower.findMany({
        where: { userId: userId },
        include: { user: true },
    })
    return results.map(result => result.user)
}
