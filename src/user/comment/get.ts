import "server-only"
import { UserCommentId } from "./type"
import { prisma } from "@/prisma"
import { UserId } from "../type"

export const getUserComment = async (commentId: UserCommentId) => {
    return await prisma.userComment.findFirst({
        where: { commentId },
    })
}

export const getUserCommentsByUserId = async (userId: UserId) => {
    return await prisma.userComment.findMany({
        where: { commentUserId: userId },
    })
}
