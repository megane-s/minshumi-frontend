import { prisma } from "@/prisma"
import "server-only"
import { ArtId } from "../type"

/**
 * 作品に対するいいねの数を取得する
 * @param artId 対象の作品のID
 * @returns その作品へのいいねの数
 */
export const getArtGoodCount = async (artId: ArtId): Promise<number> => {
    const count = await prisma.artGoodUser.count({
        where: { artId },
    })
    return count
}
