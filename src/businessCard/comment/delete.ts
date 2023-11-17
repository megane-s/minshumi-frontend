import { prisma } from "@/prisma"
import { ProfileComment } from "@prisma/client"
import "server-only"

export const deleteBusinessCardComment = async (commentId: ProfileComment["commentId"]): Promise<void> => {
    await prisma.profileComment.delete({
        where: { commentId },
    })
}
