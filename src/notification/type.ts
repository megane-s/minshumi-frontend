// Domain層のコードなのでデータ層のアクセスを許容
// eslint-disable-next-line no-restricted-imports
import {
    Notification as GeneratedNotification,
    NotificationSchema as GeneratedNotificationSchema,
} from "@/prisma/generated"

export const NotificationSchema = GeneratedNotificationSchema
export type Notification = GeneratedNotification

export const NotificationIdSchema = GeneratedNotificationSchema.shape.notificationId
export type NotificationId = GeneratedNotification["notificationId"]
