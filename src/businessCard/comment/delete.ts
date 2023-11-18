import { prisma } from "@/prisma"
import { BusinessCardComment } from "@prisma/client"
import "server-only"

/**
 * 名刺に対するコメントを削除する。
 * @param commentId 削除するコメントのID。
 */
export const deleteBusinessCardComment = async (commentId: BusinessCardComment["commentId"]): Promise<void> => {
    await prisma.businessCardComment.delete({
        where: { commentId },
    })
}
