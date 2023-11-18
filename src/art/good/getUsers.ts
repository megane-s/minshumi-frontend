import { prisma } from "@/prisma"
import { ArtGoodUser, User } from "@prisma/client"
import "server-only"

/**
 * 指定した作品をいいねしたユーザの一覧を取得する。
 * @param artId 指定する作品のID
 * @returns いいねしたユーザの一覧
 */
export const getGoodUsers = async (artId: ArtGoodUser["artId"]): Promise<User[]> => {
    const results = await prisma.artGoodUser.findMany({
        where: { artId },
        include: { user: true },
    })
    return results.map(result => result.user)
}
