import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

export const getBusinessCardByUser = async (userId: User["id"]): Promise<User[]> => {
    const results = await prisma.businessCard.findMany({
        where: { userId },
        include: {
            user: true,
        }
    })
    return results.map(result => result.user)
}
