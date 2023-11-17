import "server-only";

import { prisma } from "@/prisma";
import { ProfileCommentGoodUser } from "@prisma/client";

export const cancelGoodBusinessCardCommentGood = async (commentId: ProfileCommentGoodUser["commentId"], by: ProfileCommentGoodUser["goodUserId"]): Promise<void> => {
    await prisma.profileCommentGoodUser.delete({
        where: { commentId_goodUserId: { commentId, goodUserId: by } }
    })
}
