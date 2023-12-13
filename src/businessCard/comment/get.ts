import "server-only"
import { BusinessCardCommentId } from "./type"
import { prisma } from "@/prisma"

export const getBusinessCardComment = async (commentId: BusinessCardCommentId) => {
    return await prisma.businessCardComment.findFirst({
        where: { commentId },
    })
}
