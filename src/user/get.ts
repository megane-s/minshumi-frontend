import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

export const getUser = async (userId: User["id"]): Promise<User | null> => {
    const user = await prisma.user.findFirst({
        where: { id: userId },
    })
    return user
}
