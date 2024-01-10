import "server-only"

import { UserId } from "@/user/type";
import { ArtAppeal } from "../type";
import { prisma } from "@/prisma";

export const getArtAppealsByUser = async (userId: UserId): Promise<ArtAppeal[]> => {
    const artAppeals = await prisma.artAppeal.findMany({
        include: { art: true },
        where: { userId },
    })
    return artAppeals.map(({ art, likePoint, userId }) => ({ ...art, likePoint, userId }))
}
