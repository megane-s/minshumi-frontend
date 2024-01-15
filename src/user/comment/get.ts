import "server-only"
import { UserCommentId } from "./type"
import { prisma } from "@/prisma"

export const getUserComment = async (commentId: UserCommentId) => {
    return await prisma.userComment.findFirst({
        where: { commentId },
    })
}
