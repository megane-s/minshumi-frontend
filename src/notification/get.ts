import { prisma } from "@/prisma";
import { User } from "@prisma/client";

export const getNotifications = async (userId: User["id"]) => {
    return await prisma.notification.findMany({
        where: { userId },
    })
}
