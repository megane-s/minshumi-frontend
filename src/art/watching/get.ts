import { prisma } from "@/prisma"
import { Art, User } from "@prisma/client"
import "server-only"

export const getWatchingArts = async (userId: User["id"]): Promise<Art[]> => {
    const results = await prisma.watchingArt.findMany({
        where: { userId },
        include: { art: true },
    })
    return results.map(result => result.art)
}
