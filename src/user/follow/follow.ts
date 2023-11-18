import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

export const follow = async (by: User["id"], followUser: User["id"]): Promise<void> => {
    await prisma.follower.create({
        data: {
            userId: by,
            followerId: followUser,
        },
    })
}
