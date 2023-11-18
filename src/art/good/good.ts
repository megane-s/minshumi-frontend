import { prisma } from "@/prisma"
import { Art, ArtGoodUser } from "@prisma/client"
import "server-only"

export const goodToArt = async (artId: Art["artId"], by: ArtGoodUser["userId"]): Promise<void> => {
    await prisma.artGoodUser.create({
        data: {
            artId,
            userId: by,
            artArtId: artId,
        }
    })
}
