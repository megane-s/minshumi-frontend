import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { ArtId, ArtTag } from "../type";

export const updateArtTags = async (
    artId: ArtId,
    userId: UserId,
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
        await prisma.artTagsEditHistory.create({
            data: {
                tags: tags.map(({ tag }) => tag),
                artEditHistory: {
                    create: {
                        artId,
                        updateUserId: userId,
                    },
                },
            },
            include: {
                artEditHistory: true,
            }
        })
    })

}
