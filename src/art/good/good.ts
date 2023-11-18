import { prisma } from "@/prisma"
import { Art, ArtGoodUser } from "@prisma/client"
import "server-only"

/**
 * 指定した作品に対していいねする。
 * @param artId 対象の作品のID
 * @param by いいねするユーザのID
 */
export const goodToArt = async (artId: Art["artId"], by: ArtGoodUser["userId"]): Promise<void> => {
    await prisma.artGoodUser.create({
        data: {
            artId,
            userId: by,
            artArtId: artId,
        }
    })
}
