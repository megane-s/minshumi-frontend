import { z } from "zod"
import { ArtIdSchema, ArtSchema, ArtTagSchema } from "../type"

export const InputRelatedArtSchema = z.union([
    ArtSchema,
    ArtSchema.pick({
        title: true,
        imageUrl: true,
        description: true,
    }),
])
export type InputRelatedArt = z.infer<typeof InputRelatedArtSchema>


export const NewArtSessionIdSchema = z.string()
export type NewArtSessionId = z.infer<typeof NewArtSessionIdSchema>
export const NewArtSessionSchema = z.object({
    artId: ArtIdSchema.nullable(),
    title: z.string(),
    description: z.string(),
    likePoint: z.string(),
    imageUrl: z.string(),
    mediaTags: ArtTagSchema.array(),
    genreTags: ArtTagSchema.array(),
    otherTags: ArtTagSchema.array(),
    prevArts: InputRelatedArtSchema.array(),
    nextArts: InputRelatedArtSchema.array(),
})
export type NewArtSession = z.infer<typeof NewArtSessionSchema>
export const NewArtSessionInputSchema = NewArtSessionSchema.partial()
export type NewArtSessionInput = z.infer<typeof NewArtSessionInputSchema>
