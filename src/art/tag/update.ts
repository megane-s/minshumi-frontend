import { prisma } from "@/prisma";
import { ArtId, ArtTag } from "../type";

export const updateArtTags = async (
    artId: ArtId,
    { medias, genres, others }: { medias: ArtTag[], genres: ArtTag[], others: ArtTag[] },
) => {
    const tags = [
        ...medias.map(tag => ({ artId, tag, tagType: "MEDIA" } as const)),
        ...genres.map(tag => ({ artId, tag, tagType: "GENRE" } as const)),
        ...others.map(tag => ({ artId, tag, tagType: "OTHER" } as const)),
    ]
    await prisma.$transaction(async (prisma) => {
        await prisma.artTag.deleteMany({
            where: { artId }
        })
        await prisma.artTag.createMany({
            data: tags,
        })
    })
}
