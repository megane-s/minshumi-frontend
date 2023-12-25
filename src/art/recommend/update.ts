import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"

export const updateRecommendArt = async (artId: string, userId: UserId, input: { likePoint: string }) => {
    return await prisma.recommendArt.update({
        where: { userId_artId: { userId, artId } },
        data: input,
    })
}
