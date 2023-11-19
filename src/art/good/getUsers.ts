import { prisma } from "@/prisma"
import { User } from "@/user/type"
import "server-only"
import { ArtId } from "../type"

/**
 * 指定した作品をいいねしたユーザの一覧を取得する。
 * @param artId 指定する作品のID
 * @returns いいねしたユーザの一覧
 */
export const getGoodUsers = async (artId: ArtId): Promise<User[]> => {
    const results = await prisma.artGoodUser.findMany({
        where: { artId },
        include: { user: true },
    })
    return results.map(result => result.user)
}
