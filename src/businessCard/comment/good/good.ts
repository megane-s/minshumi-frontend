import "server-only";

import { prisma } from "@/prisma";
import { BusinessCardCommentGoodUser } from "@prisma/client";

/**
 * 名刺に対するコメントへいいねする。
 * @param commentId いいねするコメントのID。
 * @param by いいねするユーザのID。
 */
export const goodToBusinessCardCommentGood = async (commentId: BusinessCardCommentGoodUser["commentId"], by: BusinessCardCommentGoodUser["goodUserId"]): Promise<void> => {
    await prisma.businessCardCommentGoodUser.create({
        data: {
            commentId,
            goodUserId: by,
        }
    })
}
