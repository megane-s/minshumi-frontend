import { UserId } from "@/user/type";
import { prisma } from "@/prisma";
import { UserCommentId } from "../type";

/**
 * 指定したユーザが指定した名刺のコメントをいいねしているかどうかを返す関数。
 * @param commentId コメントのID
 * @param by ユーザのID
 * @returns byで指定したユーザがartIdの作品をいいねしているかどうか
 */
export const isUserCommentGooded = async (commentId: UserCommentId, by: UserId): Promise<boolean> => {
    const count = await prisma.userCommentGoodUser.count({
        where: { commentId, goodUserId: by },
        take: 1,
    })
    return count >= 1
}
