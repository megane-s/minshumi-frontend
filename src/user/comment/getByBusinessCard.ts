import "server-only";

import { prisma } from "@/prisma";
import { UserId } from "../type";
import { UserComment } from "./type";

/**
 * 指定した名刺に対するコメントの一覧を新しい順で取得する。
 * @param businessCardId 対象の名刺のID。
 * @returns 指定した名刺に紐づくコメントの一覧。
 */
export const getCommentsByBusinessCard = async (userId: UserId): Promise<UserComment[]> => {
    const results = await prisma.userComment.findMany({
        where: { commentUserId: userId },
        orderBy: { createAt: "desc" },
    })
    return results
}
