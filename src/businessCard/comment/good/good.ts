import "server-only";

import { prisma } from "@/prisma";
import { ProfileCommentGoodUser } from "@prisma/client";

export const goodToBusinessCardCommentGood = async (commentId: ProfileCommentGoodUser["commentId"], by: ProfileCommentGoodUser["goodUserId"]): Promise<void> => {
    await prisma.profileCommentGoodUser.create({
        data: {
            commentId,
            goodUserId: by,
        }
    })
}
