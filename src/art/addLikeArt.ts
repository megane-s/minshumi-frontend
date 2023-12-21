import { prisma } from "@/prisma"
// eslint-disable-next-line no-restricted-imports
import { RelatedArt } from "@/prisma/generated"
import { UserId } from "@/user/type"
import { notImplementError } from "@/util/notImplement"
// eslint-disable-next-line no-restricted-imports
import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"
import "server-only"
import { InputRelatedArt, NewArtSession } from "./newArtSession/type"

export const addLikeArt = async (newArtSession: NewArtSession, by: UserId) => {
    return await prisma.$transaction(async (prisma) => {
        const art = await createOrGetArt(prisma, newArtSession, by)

        const likePoint = newArtSession.likePoint
        await prisma.recommendArt.create({
            data: {
                artId: art.artId,
                userId: by,
                likePoint,
            }
        })

        const relatedArts = await Promise.all([
            ...newArtSession.prevArts.map(async (input): Promise<RelatedArt> => {
                const prevRelatedArt = await createOrGetRelatedArt(prisma, input)
                return {
                    artId: art.artId,
                    relatedArtId: prevRelatedArt.artId,
                    userId: by,
                    type: "PREV",
                }
            }),
            ...newArtSession.nextArts.map(async (input): Promise<RelatedArt> => {
                const prevRelatedArt = await createOrGetRelatedArt(prisma, input)
                return {
                    artId: art.artId,
                    relatedArtId: prevRelatedArt.artId,
                    userId: by,
                    type: "NEXT",
                }
            }),
        ])
        await prisma.relatedArt.createMany({
            data: relatedArts,
        })
        return [art, relatedArts] as const
    })
}

const createOrGetArt = async (
    prisma: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
    newArtSession: NewArtSession,
    by: UserId,
) => {
    if (newArtSession.artId) {
        const art = await prisma.art.findUnique({
            where: { artId: newArtSession.artId },
        })
        if (!art) throw notImplementError(`invalid artId :${newArtSession.artId}`)
        return art
    }
    const title = newArtSession.title
    const description = newArtSession.description
    const imageUrl = newArtSession.imageUrl
    if (typeof title === "undefined" || typeof description === "undefined" || typeof imageUrl === "undefined") {
        throw notImplementError(`invalid input :${JSON.stringify(newArtSession)}`)
    }
    const newArt = await prisma.art.create({
        data: {
            title: title,
            description: description,
            imageUrl: imageUrl,
            tags: {
                create: [
                    ...(newArtSession.mediaTags?.map(tag => ({ tag, tagType: "MEDIA" } as const)) ?? []),
                    ...(newArtSession.genreTags?.map(tag => ({ tag, tagType: "GENRE" } as const)) ?? []),
                    ...(newArtSession.otherTags?.map(tag => ({ tag, tagType: "OTHER" } as const)) ?? []),
                ],
            },
            userId: by,
        },
        include: { tags: true },
    })
    return newArt
}

const createOrGetRelatedArt = async (
    prisma: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
    relatedArt: InputRelatedArt,
) => {
    if ("artId" in relatedArt) {
        const art = await prisma.art.findUnique({
            where: { artId: relatedArt.artId },
        })
        if (!art) throw notImplementError(`invalid related artId :${relatedArt.artId}`)
        return art
    }
    return await prisma.art.create({
        data: {
            title: relatedArt.title,
            description: relatedArt.description,
            imageUrl: relatedArt.imageUrl,
        },
    })
}
