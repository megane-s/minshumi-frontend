import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { Notification } from "./type";

/**
 * 指定したユーザに届いている通知一覧を取得する。
 * @param userId 指定するユーザのID。
 * @returns 届いている通知一覧。
 */
export const getNotifications = async (userId: UserId): Promise<Notification[]> => {
    return await prisma.notification.findMany({
        where: { userId },
    })
}
