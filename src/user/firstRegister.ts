import { prisma } from "@/prisma"
import "server-only"
import { FirstRegisterInput, UserId } from "./type"

export const firstRegister = async (userId: UserId, input: FirstRegisterInput) => {
    await prisma.$transaction(async prisma => {
        await Promise.all(
            input.interestTags.map(async tag =>
                await prisma.interestTag.upsert({
                    where: { userId_tag: { userId, tag } },
                    create: { userId, tag },
                    update: { userId, tag },
                })
            )
        )
    })
}
