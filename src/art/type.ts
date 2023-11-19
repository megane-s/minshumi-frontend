// Domain層のコードなのでデータ層のアクセスを許容
// eslint-disable-next-line no-restricted-imports
import {
    Art as GeneratedArt,
    ArtSchema as GeneratedArtSchema,
    ArtTag as GeneratedArtTag,
    ArtTagSchema as GeneratedArtTagSchema,
} from "@/prisma/generated"

export const ArtSchema = GeneratedArtSchema
export type Art = GeneratedArt

export const ArtIdSchema = ArtSchema.shape.artId
export type ArtId = Art["artId"]

export const ArtTagSchema = GeneratedArtTagSchema.shape.tag
export type ArtTag = GeneratedArtTag["tag"]
