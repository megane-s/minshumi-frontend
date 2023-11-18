import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

/**
 * 指定したユーザの興味のあるタグを取得する。
 * @param userId 対象のユーザID
 * @returns 興味のあるタグ一覧
 */
export const getInterestTags = async (userId: User["id"]): Promise<string[]> => {
    const results = await prisma.interestTag.findMany({
        where: { userId },
    })
    return results.map(result => result.tag)
}
