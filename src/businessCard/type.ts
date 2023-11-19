// Domain層のコードなのでデータ層のアクセスを許容
// eslint-disable-next-line no-restricted-imports
import {
    BusinessCard as GeneratedBusinessCard,
    BusinessCardSchema as GeneratedBusinessCardSchema
} from "@/prisma/generated";

export const BusinessCardSchema = GeneratedBusinessCardSchema
export type BusinessCard = GeneratedBusinessCard

export const BusinessCardIdSchema = GeneratedBusinessCardSchema.shape.businessCardId
export type BusinessCardId = GeneratedBusinessCard["businessCardId"]
