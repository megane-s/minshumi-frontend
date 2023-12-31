import { prisma } from "@/prisma"
import "server-only"
import { BusinessCardId } from "./type"

export const getBusinessCardLikeArts = async (businessCardId: BusinessCardId) => {
    return (
        await prisma.businessCardLikeArt.findMany({
            where: { businessCardId },
        })
            .then(rows => rows.map(row => row.likeArtTitle))
    )
}

