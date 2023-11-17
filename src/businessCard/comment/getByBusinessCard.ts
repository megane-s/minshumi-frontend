import "server-only";

import { prisma } from "@/prisma";
import { ProfileComment } from "@prisma/client";

export const getCommentsByBusinessCard = async (businessCardId: ProfileComment["businessCardId"]): Promise<ProfileComment[]> => {
    const results = await prisma.profileComment.findMany({
        where: { businessCardId },
    })
    return results
}
