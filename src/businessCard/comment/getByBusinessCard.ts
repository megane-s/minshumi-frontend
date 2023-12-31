import "server-only";

import { prisma } from "@/prisma";
import { BusinessCardId } from "../type";
import { BusinessCardComment } from "./type";

/**
 * 指定した名刺に対するコメントの一覧を新しい順で取得する。
 * @param businessCardId 対象の名刺のID。
 * @returns 指定した名刺に紐づくコメントの一覧。
 */
export const getCommentsByBusinessCard = async (businessCardId: BusinessCardId): Promise<BusinessCardComment[]> => {
    const results = await prisma.businessCardComment.findMany({
        where: { businessCardId },
        orderBy: { createAt: "desc" },
    })
    return results
}
