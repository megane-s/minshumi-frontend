import { prisma } from "@/prisma";
import { User } from "@prisma/client";
import "server-only";

export const addInterestTag = async (userId: User["id"], ...tags: string[]): Promise<void> => {
    await prisma.interestTag.createMany({
        data: tags.map(tag => ({ tag, userId })),
    })
}
