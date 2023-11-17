import "server-only";

import { prisma } from "@/prisma";
import { BusinessCardCommentGoodUser } from "@prisma/client";

export const cancelGoodBusinessCardCommentGood = async (commentId: BusinessCardCommentGoodUser["commentId"], by: BusinessCardCommentGoodUser["goodUserId"]): Promise<void> => {
    await prisma.businessCardCommentGoodUser.delete({
        where: { commentId_goodUserId: { commentId, goodUserId: by } }
    })
}
