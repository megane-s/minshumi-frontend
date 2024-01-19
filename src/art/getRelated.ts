import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import "server-only";
import { ArtId, RelatedArt } from "./type";

/**
 * 未実装。
 * 指定した作品に関連する作品を取得する。
 * @param artId 指定する作品のID。
 * @returns 関連する作品の一覧。
 */
// 未実装のためdisable。実装し次第外す。
// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
export const getRelatedArts = async (artId: ArtId, userId: UserId): Promise<RelatedArt[]> => {
    const relatedArts = await prisma.relatedArt.findMany({
        where: { artId, userId },
        include: { relatedArt: true },
    })
    return relatedArts.map(relatedArt => ({
        ...relatedArt.relatedArt,
        type: relatedArt.type,
    }))
}
