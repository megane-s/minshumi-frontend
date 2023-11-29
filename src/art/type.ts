// Domain層のコードなのでデータ層のアクセスを許容
// eslint-disable-next-line no-restricted-imports
import {
    Art as GeneratedArt,
    ArtSchema as GeneratedArtSchema,
    ArtTag as GeneratedArtTag,
    ArtTagSchema as GeneratedArtTagSchema,
    RecommendArtSchema as GeneratedRecommendArtSchema,
} from "@/prisma/generated"
import { z } from "zod"

export const ArtSchema = GeneratedArtSchema
export type Art = GeneratedArt

export const ArtIdSchema = ArtSchema.shape.artId
export type ArtId = Art["artId"]

export const ArtTagSchema = GeneratedArtTagSchema.shape.tag
export type ArtTag = GeneratedArtTag["tag"]

export const RecommendArtSchema = GeneratedArtSchema.extend(
    GeneratedRecommendArtSchema.pick({ likePoint: true }).shape
)
export type RecommendArt = z.infer<typeof RecommendArtSchema>
