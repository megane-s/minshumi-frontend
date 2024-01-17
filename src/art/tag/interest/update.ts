import { ArtTag } from "@/art/type"
import { prisma } from "@/prisma"
import { UserId } from "@/user/type"

export const updateInterestTags = async (userId: UserId, tags: ArtTag[]) => {
    await prisma.$transaction(async prisma => {
        await prisma.interestTag.deleteMany({
            where: { userId },
        })
        await Promise.all(tags.map(tag =>
            prisma.interestTag.upsert({
                where: { userId_tag: { userId, tag } },
                create: { userId, tag },
                update: { userId, tag, },
            })
        ))
    })
}