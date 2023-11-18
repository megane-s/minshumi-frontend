import { prisma } from "@/prisma";
import { User } from "@prisma/client";
import "server-only";

export const removeInterestTag = async (userId: User["id"], ...tags: string[]): Promise<void> => {
    await prisma.interestTag.deleteMany({
        where: { userId, tag: { in: tags } },
    })
}
