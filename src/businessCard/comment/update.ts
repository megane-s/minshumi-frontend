import { prisma } from '@/prisma';
import "server-only";
import { z } from 'zod';
import { BusinessCardComment, BusinessCardCommentId, BusinessCardCommentSchema } from './type';

export const UpdateBusinessCardCommentSchema = BusinessCardCommentSchema.partial()
export type UpdateBusinessCardComment = z.infer<typeof UpdateBusinessCardCommentSchema>

/**
 * コメントの内容を更新する。
 * @param commentId 対象のコメントのID。
 * @param params コメントの更新内容。
 * @returns 更新後のコメンt。
 */
export const updateBusinessCardComment = async (commentId: BusinessCardCommentId, params: UpdateBusinessCardComment): Promise<BusinessCardComment> => {
    const result = await prisma.businessCardComment.update({
        where: { commentId },
        data: params,
    })
    return result
}
