import "server-only";

import { prisma } from "@/prisma";
import { BusinessCardComment } from "@prisma/client";

/**
 * 指定した名刺に対するコメントの一覧を取得する。
 * @param businessCardId 対象の名刺のID。
 * @returns 指定した名刺に紐づくコメントの一覧。
 */
export const getCommentsByBusinessCard = async (businessCardId: BusinessCardComment["businessCardId"]): Promise<BusinessCardComment[]> => {
    const results = await prisma.businessCardComment.findMany({
        where: { businessCardId },
    })
    return results
}