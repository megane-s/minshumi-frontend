import { prisma } from "@/prisma"
import { BusinessCardComment } from "@prisma/client"
import "server-only"

export const deleteBusinessCardComment = async (commentId: BusinessCardComment["commentId"]): Promise<void> => {
    await prisma.businessCardComment.delete({
        where: { commentId },
    })
}
