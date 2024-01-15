import "server-only";

import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { UserCommentId } from "../type";

/**
 * 名刺に対するコメントへのいいねを取り消す。
 * @param commentId いいねを取り消すコメントのID。
 * @param by いいねしたユーザのID。
 */
export const cancelGoodUserCommentGood = async (commentId: UserCommentId, by: UserId): Promise<void> => {
    await prisma.userCommentGoodUser.delete({
        where: { commentId_goodUserId: { commentId, goodUserId: by } }
    })
}
