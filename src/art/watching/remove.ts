import { prisma } from "@/prisma"
import { Art, User } from "@prisma/client"
import "server-only"

export const removeWatchingArt = async (userId: User["id"], artId: Art["artId"]): Promise<void> => {
    await prisma.watchingArt.delete({
        where: { userId_artId: { userId, artId } },
    })
}
