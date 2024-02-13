import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { Notification, NotificationId } from "./type";

/**
 * 指定したユーザに届いている通知一覧を取得する。
 * @param userId 指定するユーザのID。
 * @returns 届いている通知一覧。
 */
export const getNotifications = async (
    userId: UserId,
    params: Partial<{
        recommend: Partial<{ limit: number }>
        others: Partial<{ limit: number }>
        markAsRead?: true
    }> = {},
): Promise<{
    recommends: Notification[]
    others: Notification[]
}> => {
    const [recommends, others] = await Promise.all([
        prisma.notification.findMany({
            where: { type: "recommend", userId },
            take: params.recommend?.limit ?? 5,
            orderBy: { createAt: "desc" },
        }),
        prisma.notification.findMany({
            where: { type: { not: "recommend" }, userId },
            take: params.others?.limit,
            orderBy: { createAt: "desc" },
        }),
    ])
    if (params.markAsRead) {
        await Promise.all([
            ...recommends.map(recommend =>
                markNotificationAsRead({
                    userId, notificationId: recommend.notificationId,
                }),
            ),
            ...others.map(recommend =>
                markNotificationAsRead({
                    userId, notificationId: recommend.notificationId,
                }),
            ),
        ])
    }
    return {
        recommends,
        others,
    }
}

export const getUnreadNotificationCount = async ({ max = 99, userId }: {
    max: number
    userId: UserId
}) => {
    return await prisma.notification.count({
        where: { read: false, userId },
        take: max,
    })
}

export const markNotificationAsRead = async ({ userId, notificationId }: {
    userId: UserId
    notificationId: NotificationId
}) => {
    await prisma.notification.update({
        where: { userId, notificationId },
        data: {
            read: true,
        },
    })
}
