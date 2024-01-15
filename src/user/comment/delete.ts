import { prisma } from "@/prisma"
import "server-only"
import { UserCommentId } from "./type"

/**
 * 名刺に対するコメントを削除する。
 * @param commentId 削除するコメントのID。
 */
export const deleteUserComment = async (commentId: UserCommentId): Promise<void> => {
    await prisma.userComment.delete({
        where: { commentId },
    })
}
