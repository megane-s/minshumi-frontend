import { prisma } from "@/prisma"
import { Art, ArtGoodUser } from "@prisma/client"
import "server-only"

/**
 * 特定のユーザがいいねした作品の一覧
 * @param userId 対象のユーザのID
 * @returns いいねした作品一覧
 */
export const getGoodArts = async (userId: ArtGoodUser["userId"]): Promise<Art[]> => {
    const results = await prisma.artGoodUser.findMany({
        where: { userId },
        include: { art: true },
    })
    return results.map(result => result.art)
}
