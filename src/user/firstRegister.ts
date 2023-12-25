import { prisma } from "@/prisma"
import "server-only"
import { FirstRegisterInput, UserId } from "./type"

export const firstRegister = async (userId: UserId, input: FirstRegisterInput) => {
    await prisma.interestTag.createMany({
        data: input.interestTags.map((tag) => ({ userId, tag })),
    })
}
