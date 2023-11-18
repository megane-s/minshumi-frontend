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

/**
 * 未実装。
 * ユーザに通知を届ける。
 * @param params 送信する通知の内容。
 */
// 未実装のためdisable。実装し次第外す。
// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
export const sendNotification = async (params: SendNotificationParams): Promise<void> => {
    notImplementWarn("sendNotification はまだ実装されていません。")
}
