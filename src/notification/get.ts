import { prisma } from "@/prisma";
import { Notification, User } from "@prisma/client";

/**
 * 指定したユーザに届いている通知一覧を取得する。
 * @param userId 指定するユーザのID。
 * @returns 届いている通知一覧。
 */
export const getNotifications = async (userId: User["id"]): Promise<Notification[]> => {
    return await prisma.notification.findMany({
        where: { userId },
    })
}
