import { prisma } from "@/prisma"
import "server-only"
import { User, UserId } from "./type"

/**
 * 指定したユーザの情報を取得する。
 * @param userId 指定するユーザ。
 * @returns 指定したユーザの情報。見つからなかった場合はnull。
 */
export const getUser = async (userId: UserId): Promise<User | null> => {
    const user = await prisma.user.findFirst({
        where: { id: userId },
    })
    return user
}
