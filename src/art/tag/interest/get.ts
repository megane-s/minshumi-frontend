import { ArtTag } from "@/art/type"
import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"

/**
 * 指定したユーザの興味のあるタグを取得する。
 * @param userId 対象のユーザID
 * @returns 興味のあるタグ一覧
 */
export const getInterestTags = async (userId: UserId): Promise<ArtTag[]> => {
    const results = await prisma.interestTag.findMany({
        where: { userId },
    })
    return results.map(result => result.tag)
}
