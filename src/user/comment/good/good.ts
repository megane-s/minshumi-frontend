import "server-only";

import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { UserCommentId } from "../type";

/**
 * 名刺に対するコメントへいいねする。
 * @param commentId いいねするコメントのID。
 * @param by いいねするユーザのID。
 */
export const goodToUserCommentGood = async (commentId: UserCommentId, by: UserId): Promise<void> => {
    await prisma.userCommentGoodUser.create({
        data: {
            commentId,
            goodUserId: by,
        }
    })
}
