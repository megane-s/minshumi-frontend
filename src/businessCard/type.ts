// Domain層のコードなのでデータ層のアクセスを許容
// eslint-disable-next-line no-restricted-imports
import {
    BusinessCard as GeneratedBusinessCard,
    BusinessCardInterestTagSchema as GeneratedBusinessCardInterestTagSchema,
    BusinessCardLikeArtSchema as GeneratedBusinessCardLikeArtSchema,
    BusinessCardSchema as GeneratedBusinessCardSchema,
} from "@/prisma/generated";
import { z } from "zod";

export const BusinessCardSchema = GeneratedBusinessCardSchema
export type BusinessCard = GeneratedBusinessCard

export const BusinessCardIdSchema = GeneratedBusinessCardSchema.shape.businessCardId
export type BusinessCardId = GeneratedBusinessCard["businessCardId"]

export const BusinessCardInterestTagSchema = GeneratedBusinessCardInterestTagSchema.shape.tag
export type BusinessCardInterestTag = z.infer<typeof BusinessCardInterestTagSchema>

export const BusinessCardLikeArtSchema = GeneratedBusinessCardLikeArtSchema.shape.likeArtTitle
export type BusinessCardLikeArt = z.infer<typeof BusinessCardLikeArtSchema>
