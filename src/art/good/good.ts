import { prisma } from "@/prisma"
import { UserId } from "@/user/type"
import "server-only"
import { ArtId } from "../type"

/**
 * 指定した作品に対していいねする。
 * @param artId 対象の作品のID
 * @param by いいねするユーザのID
 */
export const goodToArt = async (artId: ArtId, by: UserId): Promise<void> => {
    await prisma.artGoodUser.create({
        data: {
            artId,
            userId: by,
            artArtId: artId,
        }
    })
}
