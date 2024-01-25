import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { Notification } from "./type";

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
    }> = {},
): Promise<{
    recommends: Notification[]
    others: Notification[]
}> => {
    const [recommends, others] = await Promise.all([
        prisma.notification.findMany({
            where: { type: "recommend", userId },
            take: params.recommend?.limit ?? 5,
            orderBy: { updateAt: "desc" },
        }),
        prisma.notification.findMany({
            where: { type: { not: "recommend" }, userId },
            take: params.others?.limit,
            orderBy: { updateAt: "desc" },
        }),
    ])
    return {
        recommends,
        others,
    }
}

