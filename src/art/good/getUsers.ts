import { prisma } from "@/prisma"
import { ArtGoodUser, User } from "@prisma/client"
import "server-only"

export const getGoodUsers = async (userId: ArtGoodUser["userId"]): Promise<User[]> => {
    const results = await prisma.artGoodUser.findMany({
        where: { userId },
        include: { user: true },
    })
    return results.map(result => result.user)
}
