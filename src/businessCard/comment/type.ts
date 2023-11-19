// Domain層のコードなのでデータ層のアクセスを許容
// eslint-disable-next-line no-restricted-imports
import {
    BusinessCardComment as GeneratedBusinessCardComment,
    BusinessCardCommentSchema as GeneratedBusinessCardCommentSchema
} from "@/prisma/generated";

export const BusinessCardCommentSchema = GeneratedBusinessCardCommentSchema
export type BusinessCardComment = GeneratedBusinessCardComment

export const BusinessCardCommentIdSchema = GeneratedBusinessCardCommentSchema.shape.commentId
export type BusinessCardCommentId = GeneratedBusinessCardComment["commentId"]
