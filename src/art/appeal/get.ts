import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"
import { ArtAppeal, ArtId } from "../type"

export const getArtAppeal = async (artId: ArtId, userId: UserId): Promise<ArtAppeal | null> => {
    const recommendArt = await prisma.artAppeal.findUnique({
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
