// Domain層のコードなのでデータ層のアクセスを許容
// eslint-disable-next-line no-restricted-imports
import {
    UserComment as GeneratedUserComment,
    UserCommentSchema as GeneratedUserCommentSchema
} from "@/prisma/generated";

export const UserCommentSchema = GeneratedUserCommentSchema
export type UserComment = GeneratedUserComment

export const UserCommentIdSchema = GeneratedUserCommentSchema.shape.commentId
export type UserCommentId = GeneratedUserComment["commentId"]
