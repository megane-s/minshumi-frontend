import "server-only"

import { ArtAppeal, ArtId } from "../type";
import { prisma } from "@/prisma";

export const getArtAppealsByArt = async (artId: ArtId): Promise<ArtAppeal[]> => {
    const artAppeals = await prisma.artAppeal.findMany({
        include: { art: true },
        where: { artId },
    })
    return artAppeals.map(({ art, likePoint, userId }) => ({ ...art, likePoint, userId }))
}
