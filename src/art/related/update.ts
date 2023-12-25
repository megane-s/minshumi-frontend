import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import { notImplementError } from "@/util/notImplement"
// eslint-disable-next-line no-restricted-imports
import { PrismaClient, RelatedArt } from "@prisma/client"
import "server-only"
import { InputRelatedArt } from "../newArtSession/type"
import { ArtId } from "../type"

export const updateRelatedArt = async (artId: ArtId, by: UserId, { prevArts, nextArts }: { prevArts: InputRelatedArt[], nextArts: InputRelatedArt[] }) => {
    const relatedArtModels = await Promise.all([
        ...prevArts.map(async (input): Promise<RelatedArt> => {
            const prevRelatedArt = await createOrGetRelatedArt(prisma, input)
            return {
                artId: artId,
                relatedArtId: prevRelatedArt.artId,
                userId: by,
                type: "PREV",
            }
        }),
        ...nextArts.map(async (input): Promise<RelatedArt> => {
            const prevRelatedArt = await createOrGetRelatedArt(prisma, input)
            return {
                artId: artId,
                relatedArtId: prevRelatedArt.artId,
                userId: by,
                type: "NEXT",
            }
        }),
    ])
    await prisma.$transaction(async (prisma) => {
        await prisma.relatedArt.deleteMany({
            where: { artId },
        })
        await Promise.all(relatedArtModels.map(async (relatedArtModel) => {
            await prisma.relatedArt.upsert({
                where: {
                    artId_relatedArtId: {
                        artId: relatedArtModel.artId,
                        relatedArtId: relatedArtModel.relatedArtId,
                    }
                },
                create: relatedArtModel,
                update: relatedArtModel,
            })
        }))
    })
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
