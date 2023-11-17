import { prisma } from "@/prisma"
import { Art } from "@prisma/client"
import "server-only"

export const getArtGoodCount = async (artId: Art["artId"]): Promise<number> => {
    const count = await prisma.artGoodUser.count({
        where: { artId },
    })
    return count
}
