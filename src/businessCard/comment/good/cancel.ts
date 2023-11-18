import "server-only";

import { prisma } from "@/prisma";
import { BusinessCardCommentGoodUser } from "@prisma/client";

/**
 * 名刺に対するコメントへのいいねを取り消す。
 * @param commentId いいねを取り消すコメントのID。
 * @param by いいねしたユーザのID。
 */
export const cancelGoodBusinessCardCommentGood = async (commentId: BusinessCardCommentGoodUser["commentId"], by: BusinessCardCommentGoodUser["goodUserId"]): Promise<void> => {
    await prisma.businessCardCommentGoodUser.delete({
        where: { commentId_goodUserId: { commentId, goodUserId: by } }
    })
}
