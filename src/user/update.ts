import { prisma } from "@/prisma"
import "server-only"
import { z } from "zod"
import { User, UserSchema } from "./type"

export const UpdateUserParamsSchema = UserSchema.pick({
    image: true,
    name: true,
})
export type UpdateUserParams = z.infer<typeof UpdateUserParamsSchema>

/**
 * ユーザの情報を更新する。
 * @param userId 更新するユーザのID。
 * @param params 更新内容。
 * @returns 更新後のユーザの内容。
 */
export const updateUser = async (userId: User["id"], params: UpdateUserParams): Promise<User | null> => {
    const result = await prisma.user.update({
        where: { id: userId },
        data: params,
    })
    return result
}
