import "server-only"

import { prisma } from "@/prisma"
import { Art, ArtTag } from "@prisma/client"

export const getArtsWithTag = async (tag: ArtTag["tag"]): Promise<Art[]> => {
    const results = await prisma.artTag.findMany({
        where: { tag },
        include: {
            art: true,
        }
    })
    return results.map(result =>
        result.art
    )
}
