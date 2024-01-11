import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"

export const updateArtAppeal = async (artId: string, userId: UserId, input: { likePoint: string }) => {
    return await prisma.artAppeal.update({
        where: { userId_artId: { userId, artId } },
        data: input,
    })
}
