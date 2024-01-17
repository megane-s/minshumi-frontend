"use server"

import { ArtId, ArtTag } from "@/art/type"
import { prisma } from "@/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const handleSaveArtTags = async (
    artId: ArtId,
    { medias, genres, others, originals }: { medias: ArtTag[], genres: ArtTag[], others: ArtTag[], originals: ArtTag[] },
) => {
    const tags = [
        ...medias.map(tag => ({ artId, tag, tagType: "MEDIA" } as const)),
        ...genres.map(tag => ({ artId, tag, tagType: "GENRE" } as const)),
        ...others.map(tag => ({ artId, tag, tagType: "OTHER" } as const)),
        ...originals.map(tag => ({ artId, tag, tagType: "CUSTOM" } as const))
    ]
    await prisma.$transaction(async (prisma) => {
        await prisma.artTag.deleteMany({
            where: { artId }
        })
        await prisma.artTag.createMany({
            data: tags,
        })
    })

    revalidatePath(`/art/${artId}`)
    redirect(`/art/${artId}`)
}
