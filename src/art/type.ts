// Domain層のコードなのでデータ層のアクセスを許容
// eslint-disable-next-line no-restricted-imports
import {
    Art as GeneratedArt,
    ArtAppealSchema as GeneratedArtAppealSchema,
    ArtSchema as GeneratedArtSchema,
    ArtTagSchema as GeneratedArtTagSchema,
    RelatedArtSchema as GeneratedRelatedArtSchema,
} from "@/prisma/generated"
import { z } from "zod"

export const ArtSchema = GeneratedArtSchema
export type Art = GeneratedArt

export const ArtIdSchema = ArtSchema.shape.artId
export type ArtId = Art["artId"]

export const ArtTagSchema = GeneratedArtTagSchema.shape.tag
export type ArtTag = z.infer<typeof ArtTagSchema>

export const ArtTagTypeSchema = GeneratedArtTagSchema.shape.tagType
export type ArtTagType = z.infer<typeof ArtTagTypeSchema>

export const ArtAppealSchema = GeneratedArtSchema.extend(
    GeneratedArtAppealSchema.pick({ likePoint: true, userId: true }).shape
)
export type ArtAppeal = z.infer<typeof ArtAppealSchema>

export const RelatedArtSchema = GeneratedArtSchema.extend(
    GeneratedRelatedArtSchema.pick({ type: true }).shape,
)
export type RelatedArt = z.infer<typeof RelatedArtSchema>

export const CreateArtParamsSchema = ArtSchema.pick({
    title: true,
    imageUrl: true,
    description: true,
}).extend({
    mediaTags: ArtTagSchema.array(),
    genreTags: ArtTagSchema.array(),
    otherTags: ArtTagSchema.array(),
})
export type CreateArtParams = z.infer<typeof CreateArtParamsSchema>

export const InputRelatedArtSchema = z.union([
    ArtSchema,
    CreateArtParamsSchema.pick({
        title: true,
        description: true,
        imageUrl: true,
    }),
])
export type InputRelatedArt = z.infer<typeof InputRelatedArtSchema>
