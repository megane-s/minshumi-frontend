import { prisma } from '@/prisma';
import "server-only";
import { z } from 'zod';
import { UserComment, UserCommentId, UserCommentSchema } from './type';

export const UpdateUserCommentSchema = UserCommentSchema.partial()
export type UpdateUserComment = z.infer<typeof UpdateUserCommentSchema>

/**
 * コメントの内容を更新する。
 * @param commentId 対象のコメントのID。
 * @param params コメントの更新内容。
 * @returns 更新後のコメンt。
 */
export const updateUserComment = async (commentId: UserCommentId, params: UpdateUserComment): Promise<UserComment> => {
    const result = await prisma.userComment.update({
        where: { commentId },
        data: params,
    })
    return result
}
