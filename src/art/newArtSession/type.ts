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
    artId: ArtIdSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    mediaTags: ArtTagSchema.array().optional(),
    genreTags: ArtTagSchema.array().optional(),
    otherTags: ArtTagSchema.array().optional(),
    likePoint: z.string(),
    prevArts: InputRelatedArtSchema.array(),
    nextArts: InputRelatedArtSchema.array(),
})
export type NewArtSession = z.infer<typeof NewArtSessionSchema>
export const NewArtSessionInputSchema = NewArtSessionSchema.partial()
export type NewArtSessionInput = z.infer<typeof NewArtSessionInputSchema>
