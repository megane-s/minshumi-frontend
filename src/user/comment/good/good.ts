import "server-only";

import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { UserCommentId } from "../type";
import { sendGoodCommentNotification } from "@/notification/send";
import { getUserComment } from "../get";
import { notImplementError } from "@/util/notImplement";

/**
 * 名刺に対するコメントへいいねする。
 * @param commentId いいねするコメントのID。
 * @param by いいねするユーザのID。
 */
export const goodToUserCommentGood = async (commentId: UserCommentId, by: UserId, notify: boolean = true): Promise<void> => {
    const comment = await getUserComment(commentId)
    if (!comment) {
        throw notImplementError(`存在しないコメントにいいねしようとしました`)
    }
    await prisma.userCommentGoodUser.create({
        data: {
            commentId,
            goodUserId: by,
        }
    })
    if (notify) {
        await sendGoodCommentNotification({
            sendUserId: by,
            targetUserId: comment.commentUserId,
            commentId,
        })
    }
}
