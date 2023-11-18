import { prisma } from "@/prisma"
import { Art, User } from "@prisma/client"
import "server-only"

/**
 * 指定したユーザが今見ている作品の一覧を取得する。
 * @param userId 対象のユーザID
 * @returns 今見ている作品の一覧。
 */
export const getWatchingArts = async (userId: User["id"]): Promise<Art[]> => {
    const results = await prisma.watchingArt.findMany({
        where: { userId },
        include: { art: true },
    })
    return results.map(result => result.art)
}
