import { prisma } from "@/prisma"
import { User } from "@prisma/client"
import "server-only"

/**
 * 指定したユーザの情報を取得する。
 * @param userId 指定するユーザ。
 * @returns 指定したユーザの情報。見つからなかった場合はnull。
 */
export const getUser = async (userId: User["id"]): Promise<User | null> => {
    const user = await prisma.user.findFirst({
        where: { id: userId },
    })
    return user
}
