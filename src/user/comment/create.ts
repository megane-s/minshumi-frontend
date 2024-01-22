import { prisma } from "@/prisma";
import "server-only";
import { z } from "zod";
import { UserComment, UserCommentSchema } from "./type";

export const CreateUserCommentParamsSchema = UserCommentSchema.pick({
    businessCardId: true,
    content: true,
    commentUserId: true,
    targetUserId: true,
})
export type CreateUserCommentParams = z.infer<typeof CreateUserCommentParamsSchema>

/**
 * 作品にコメントを投稿する。
 * @param params 作成する名刺のID(businessCardId)とコメント内容(content)を指定する。
 * @returns 作成した作品のコメント。
 */
export const createUserComment = async (params: CreateUserCommentParams): Promise<UserComment> => {
    const result = await prisma.userComment.create({
        data: {
            ...params,
        },
    })
    return result
}
