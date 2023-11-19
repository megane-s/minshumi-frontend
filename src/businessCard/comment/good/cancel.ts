import "server-only";

import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { BusinessCardCommentId } from "../type";

/**
 * 名刺に対するコメントへのいいねを取り消す。
 * @param commentId いいねを取り消すコメントのID。
 * @param by いいねしたユーザのID。
 */
export const cancelGoodBusinessCardCommentGood = async (commentId: BusinessCardCommentId, by: UserId): Promise<void> => {
    await prisma.businessCardCommentGoodUser.delete({
        where: { commentId_goodUserId: { commentId, goodUserId: by } }
    })
}
