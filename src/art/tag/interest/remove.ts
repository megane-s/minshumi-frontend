import { prisma } from "@/prisma";
import { User } from "@prisma/client";
import "server-only";

/**
 * タグを興味のあるタグから削除する。
 * @param userId 対象のユーザID
 * @param tags 削除するタグ。複数指定可能。
 */
export const removeInterestTag = async (userId: User["id"], ...tags: string[]): Promise<void> => {
    await prisma.interestTag.deleteMany({
        where: { userId, tag: { in: tags } },
    })
}
