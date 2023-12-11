import { prisma } from "@/prisma";
import "server-only";
import { z } from "zod";
import { BusinessCardComment, BusinessCardCommentSchema } from "./type";

export const CreateBusinessCardCommentParamsSchema = BusinessCardCommentSchema.pick({
    businessCardId: true,
    content: true,
    commentUserId: true,
})
export type CreateBusinessCardCommentParams = z.infer<typeof CreateBusinessCardCommentParamsSchema>

/**
 * 作品にコメントを投稿する。
 * @param params 作成する名刺のID(businessCardId)とコメント内容(content)を指定する。
 * @returns 作成した作品のコメント。
 */
export const createBusinessCardComment = async (params: CreateBusinessCardCommentParams): Promise<BusinessCardComment> => {
    const result = await prisma.businessCardComment.create({
        data: params,
    })
    return result
}
