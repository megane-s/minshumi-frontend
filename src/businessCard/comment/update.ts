import { prisma } from '@/prisma';
import { ProfileComment, ProfileCommentSchema } from '@/prisma/generated/index';
import "server-only";
import { z } from 'zod';

export const UpdateBusinessCardCommentSchema = ProfileCommentSchema.partial()
export type UpdateBusinessCardComment = z.infer<typeof UpdateBusinessCardCommentSchema>

export const updateBusinessCardComment = async (commentId: ProfileComment["commentId"], params: UpdateBusinessCardComment): Promise<ProfileComment> => {
    const result = await prisma.profileComment.update({
        where: { commentId },
        data: params,
    })
    return result
}
