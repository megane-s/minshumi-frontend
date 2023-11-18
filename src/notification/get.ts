import { prisma } from "@/prisma";
import { Notification, User } from "@prisma/client";

export const getNotifications = async (userId: User["id"]): Promise<Notification[]> => {
    return await prisma.notification.findMany({
        where: { userId },
    })
}
