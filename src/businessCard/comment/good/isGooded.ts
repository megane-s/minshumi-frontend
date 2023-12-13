import { UserId } from "@/user/type";
import { prisma } from "@/prisma";
import { BusinessCardCommentId } from "../type";

/**
 * 指定したユーザが指定した名刺のコメントをいいねしているかどうかを返す関数。
 * @param artId 作品のID
 * @param by ユーザのID
 * @returns byで指定したユーザがartIdの作品をいいねしているかどうか
 */
export const isBusinessCardCommentGooded = async (commentId: BusinessCardCommentId, by: UserId): Promise<boolean> => {
    const count = await prisma.businessCardCommentGoodUser.count({
        where: { commentId, goodUserId: by },
        take: 1,
    })
    return count >= 1
}
