import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

export const cancelFollow = async (by: User["id"], followUser: User["id"]): Promise<void> => {
    await prisma.follower.delete({
        where: { userId_followerId: { userId: by, followerId: followUser } }
    })
}
