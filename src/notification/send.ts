import "server-only"
import { z } from "zod"
import { prisma } from "@/prisma"
import { UserIdSchema } from "@/user/type"
import { UserCommentIdSchema } from "@/user/comment/type"

export const SendGoodCommentNotificationParamsSchema = z.object({
    sendUserId: UserIdSchema,
    targetUserId: UserIdSchema,
    commentId: UserCommentIdSchema,
})
export type SendGoodCommentNotificationParams = z.infer<typeof SendGoodCommentNotificationParamsSchema>

export const sendGoodCommentNotification = async (params: SendGoodCommentNotificationParams): Promise<void> => {
    await prisma.notification.create({
        data: {
            type: "user-comment-good",
            content: JSON.stringify({
                userId: params.sendUserId,
                commentId: params.commentId,
            }),
            userId: params.targetUserId,
        },
    })
}

export const SendCommentNotificationParamsSchema = z.object({
    commentUserId: UserIdSchema,
    targetUserId: UserIdSchema,
    commentId: UserCommentIdSchema,
})
export type SendCommentNotificationParams = z.infer<typeof SendCommentNotificationParamsSchema>

export const sendCommentNotification = async (params: SendCommentNotificationParams) => {
    await prisma.notification.create({
        data: {
            type: "comment",
            content: JSON.stringify({
                userId: params.commentUserId,
                commentId: params.commentId,
            }),
            userId: params.targetUserId,
        },
    })
}
