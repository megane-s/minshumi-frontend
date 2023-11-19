import { ArtTag } from "@/art/type";
import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import "server-only";

/**
 * タグを興味あるタグに追加する。
 * @param userId 対象のユーザのID
 * @param tags 追加するタグ。複数指定可能。
 */
export const addInterestTag = async (userId: UserId, ...tags: ArtTag[]): Promise<void> => {
    await prisma.interestTag.createMany({
        data: tags.map(tag => ({ tag, userId })),
    })
}
