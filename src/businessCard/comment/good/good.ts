import "server-only";

import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { BusinessCardCommentId } from "../type";

/**
 * 名刺に対するコメントへいいねする。
 * @param commentId いいねするコメントのID。
 * @param by いいねするユーザのID。
 */
export const goodToBusinessCardCommentGood = async (commentId: BusinessCardCommentId, by: UserId): Promise<void> => {
    await prisma.businessCardCommentGoodUser.create({
        data: {
            commentId,
            goodUserId: by,
        }
    })
}
