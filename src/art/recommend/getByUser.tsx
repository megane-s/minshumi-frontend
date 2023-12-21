import "server-only"

import { UserId } from "@/user/type";
import { RecommendArt } from "../type";
import { prisma } from "@/prisma";

export const getRecommendArtsByUser = async (userId: UserId): Promise<RecommendArt[]> => {
    const recommendArts = await prisma.recommendArt.findMany({
        include: { art: true },
        where: { userId },
    })
    return recommendArts.map(({ art, likePoint, userId }) => ({ ...art, likePoint, userId }))
}
