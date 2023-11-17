import "server-only"

import { prisma } from "@/prisma"
import { ArtTag } from "@prisma/client"

export const addTagToArt = async (artId: string, ...tags: string[]): Promise<ArtTag[]> => {
    const result = await prisma.$transaction(tags.map(tag =>
        prisma.artTag.upsert({
            where: { artId_tag: { artId, tag } },
            create: { artId, tag },
            update: { artId, tag },
        })
    ))
    return result
}
