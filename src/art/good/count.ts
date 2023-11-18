import { prisma } from "@/prisma"
import { Art } from "@prisma/client"
import "server-only"

/**
 * 作品に対するいいねの数を取得する
 * @param artId 対象の作品のID
 * @returns その作品へのいいねの数
 */
export const getArtGoodCount = async (artId: Art["artId"]): Promise<number> => {
    const count = await prisma.artGoodUser.count({
        where: { artId },
    })
    return count
}
