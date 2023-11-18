import { prisma } from '@/prisma';
import { BusinessCardComment, BusinessCardCommentSchema } from '@/prisma/generated/index';
import "server-only";
import { z } from 'zod';

export const UpdateBusinessCardCommentSchema = BusinessCardCommentSchema.partial()
export type UpdateBusinessCardComment = z.infer<typeof UpdateBusinessCardCommentSchema>

/**
 * コメントの内容を更新する。
 * @param commentId 対象のコメントのID。
 * @param params コメントの更新内容。
 * @returns 更新後のコメンt。
 */
export const updateBusinessCardComment = async (commentId: BusinessCardComment["commentId"], params: UpdateBusinessCardComment): Promise<BusinessCardComment> => {
    const result = await prisma.businessCardComment.update({
        where: { commentId },
        data: params,
    })
    return result
}
