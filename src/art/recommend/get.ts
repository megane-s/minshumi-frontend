import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"
import { ArtId, RecommendArt } from "../type"

export const getRecommendArt = async (artId: ArtId, userId: UserId): Promise<RecommendArt | null> => {
    const recommendArt = await prisma.recommendArt.findUnique({
        where: { userId_artId: { userId, artId } },
        include: { art: true },
    })
    if (!recommendArt) return null
    return {
        ...recommendArt.art,
        likePoint: recommendArt.likePoint,
        userId: recommendArt.userId,
    }
}
