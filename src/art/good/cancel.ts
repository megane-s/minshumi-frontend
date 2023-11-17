import { prisma } from "@/prisma"
import { Art, ArtGoodUser } from "@prisma/client"
import "server-only"

export const cancelGoodToArt = async (artId: Art["artId"], by: ArtGoodUser["userId"]): Promise<void> => {
    await prisma.artGoodUser.delete({
        where: { artId_userId: { artId, userId: by } },
    })
}
