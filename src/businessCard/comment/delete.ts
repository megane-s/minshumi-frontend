import { prisma } from "@/prisma"
import "server-only"
import { BusinessCardCommentId } from "./type"

/**
 * 名刺に対するコメントを削除する。
 * @param commentId 削除するコメントのID。
 */
export const deleteBusinessCardComment = async (commentId: BusinessCardCommentId): Promise<void> => {
    await prisma.businessCardComment.delete({
        where: { commentId },
    })
}
