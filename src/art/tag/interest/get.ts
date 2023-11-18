import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

export const getInterestTags = async (userId: User["id"]): Promise<string[]> => {
    const results = await prisma.interestTag.findMany({
        where: { userId },
    })
    return results.map(result => result.tag)
}
