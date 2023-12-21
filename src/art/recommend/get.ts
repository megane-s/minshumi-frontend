import { prisma } from "@/prisma"
import "server-only"
import { ArtId, RecommendArt } from "../type"

export const getRecommendArt = async (artId: ArtId): Promise<RecommendArt | null> => {
    const recommendArt = await prisma.recommendArt.findFirst({
        where: { artId: artId },
        include: { art: true },
    })
    if (!recommendArt) return null
    return {
        ...recommendArt.art,
        likePoint: recommendArt.likePoint,
        userId: recommendArt.userId,
    }
}
