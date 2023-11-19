import { ArtTag } from "@/art/type";
import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import "server-only";

/**
 * タグを興味のあるタグから削除する。
 * @param userId 対象のユーザID
 * @param tags 削除するタグ。複数指定可能。
 */
export const removeInterestTag = async (userId: UserId, ...tags: ArtTag[]): Promise<void> => {
    await prisma.interestTag.deleteMany({
        where: { userId, tag: { in: tags } },
    })
}
