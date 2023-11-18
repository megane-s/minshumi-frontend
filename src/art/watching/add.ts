import { prisma } from "@/prisma"
import { Art, User } from "@prisma/client"
import "server-only"

export const addWatchingArt = async (userId: User["id"], artId: Art["artId"]): Promise<void> => {
    await prisma.watchingArt.create({
        data: {
            artId,
            userId,
        }
    })
}
