import { UserId } from "@/user/type";
import { ArtId } from "../type";
import { prisma } from "@/prisma";

/**
 * 指定したユーザが指定した作品をいいねしているかどうかを返す関数。
 * @param artId 作品のID
 * @param by ユーザのID
 * @returns byで指定したユーザがartIdの作品をいいねしているかどうか
 */
export const isArtGooded = async (artId: ArtId, by: UserId): Promise<boolean> => {
    const count = await prisma.artGoodUser.count({
        where: { artId, userId: by },
        take: 1,
    })
    return count >= 1
}
