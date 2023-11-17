import { prisma } from "@/prisma"
import { UserSchema } from "@/prisma/generated"
import { User } from "@prisma/client"
import "server-only"
import { z } from "zod"

export const UpdateUserParamsSchema = UserSchema.partial()
export type UpdateUserParams = z.infer<typeof UpdateUserParamsSchema>

export const updateUser = async (userId: User["id"], params: UpdateUserParams): Promise<User | null> => {
    const result = await prisma.user.update({
        where: { id: userId },
        data: params,
    })
    return result
}
