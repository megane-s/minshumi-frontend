import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import { notImplementError } from "@/util/notImplement"
// eslint-disable-next-line no-restricted-imports
import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"
import "server-only"
import { InputRelatedArt, NewArtSession } from "./newArtSession/type"

export const addLikeArt = async (newArtSession: NewArtSession, by: UserId) => {
    return await prisma.$transaction(async (prisma) => {
        const art = await createOrGetArt(prisma, newArtSession)

        const likePoint = newArtSession.likePoint
        await prisma.recommendArt.create({
            data: {
                artId: art.artId,
                userId: by,
                likePoint,
            }
        })

        const inputRelatedArts: InputRelatedArt[] = [...newArtSession.prevArts, ...newArtSession.nextArts]
        const relatedArts = await Promise.all((inputRelatedArts).map(async relatedArt => {
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
        }))
        await prisma.relatedArt.createMany({
            data: relatedArts.map(relatedArt => ({
                artId: art.artId,
                relatedArtId: relatedArt.artId,
                userId: by,
            })),
        })
        return [art, relatedArts] as const
    })
}

const createOrGetArt = async (
    prisma: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
    newArtSession: NewArtSession,
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
    const tags = [...newArtSession.mediaTags ?? [], ...newArtSession.genreTags ?? [], ...newArtSession.otherTags ?? []]
    if (typeof title === "undefined" || typeof description === "undefined" || typeof imageUrl === "undefined") {
        throw notImplementError(`invalid input :${JSON.stringify(newArtSession)}`)
    }
    const newArt = await prisma.art.create({
        data: {
            title: title,
            description: description,
            imageUrl: imageUrl,
            tags: {
                create: tags.map(tag => ({ tag })),
            }
        },
        include: { tags: true },
    })
    return newArt
}
