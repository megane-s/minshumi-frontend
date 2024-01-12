import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"
import { z } from "zod"
import { updateRelatedArt } from "../related/update"
import { ArtAppealSchema, RelatedArtSchema } from "../type"

export const UpdateArtAppealParamsSchema = ArtAppealSchema.pick({
    likePoint: true,
}).extend({
    prevArts: RelatedArtSchema.array(),
    nextArts: RelatedArtSchema.array(),
})
export type UpdateArtAppealParams = z.infer<typeof UpdateArtAppealParamsSchema>


export const updateArtAppeal = async (
    artId: string,
    userId: UserId,
    { prevArts, nextArts, ...input }: UpdateArtAppealParams,
) => {
    const [artAppeal] = await Promise.all([
        prisma.artAppeal.upsert({
            where: { userId_artId: { userId, artId } },
            create: { ...input, artId, userId },
            update: input,
        }),
        updateRelatedArt(artId, userId, {
            prevArts,
            nextArts,
        }),
    ])
    return artAppeal
}
