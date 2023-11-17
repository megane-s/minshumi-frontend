import "server-only"

import { prisma } from "@/prisma"

export const deleteTagFromArt = async (artId: string, tag: string): Promise<void> => {
    await prisma.artTag.delete({
        where: { artId_tag: { artId, tag } },
    })
}
