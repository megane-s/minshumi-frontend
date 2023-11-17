import { prisma } from "@/prisma"
import { Art, ArtGoodUser } from "@prisma/client"
import "server-only"

export const getGoodArts = async (userId: ArtGoodUser["userId"]): Promise<Art[]> => {
    const results = await prisma.artGoodUser.findMany({
        where: { userId },
        include: { art: true },
    })
    return results.map(result => result.art)
}
