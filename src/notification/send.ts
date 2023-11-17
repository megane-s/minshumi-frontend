import { NotificationSchema } from "@/prisma/generated"
import { notImplementWarn } from "@/util/notImplement"
import "server-only"
import { z } from "zod"

export const SendNotificationParamsSchema = NotificationSchema.pick({
    type: true,
    userId: true,
    content: true,
})
export type SendNotificationParams = z.infer<typeof SendNotificationParamsSchema>

export const sendNotification = async (params: SendNotificationParams) => {
    notImplementWarn("sendNotification はまだ実装されていません。")
}
