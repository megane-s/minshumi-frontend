import { prisma } from "@/prisma";
import { User } from "@prisma/client";
import "server-only";

/**
 * タグを興味あるタグに追加する。
 * @param userId 対象のユーザのID
 * @param tags 追加するタグ。複数指定可能。
 */
export const addInterestTag = async (userId: User["id"], ...tags: string[]): Promise<void> => {
    await prisma.interestTag.createMany({
        data: tags.map(tag => ({ tag, userId })),
    })
}
