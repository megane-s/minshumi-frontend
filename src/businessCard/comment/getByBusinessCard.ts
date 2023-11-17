import "server-only";

import { prisma } from "@/prisma";
import { BusinessCardComment } from "@prisma/client";

export const getCommentsByBusinessCard = async (businessCardId: BusinessCardComment["businessCardId"]): Promise<BusinessCardComment[]> => {
    const results = await prisma.businessCardComment.findMany({
        where: { businessCardId },
    })
    return results
}
