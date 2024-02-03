import { prisma } from "@/prisma"
import { cache } from "react"
import "server-only"
import { User } from "./type"

/**
 * ユーザを検索する。
 * @param query 検索ワード。
 * @returns 検索結果のユーザ一覧。
 */
export const searchUser = cache(async (query: string): Promise<User[]> => {
    const q_words = query.split(/\s/g)
    const users = await Promise.all(q_words.map(word =>
        prisma.user.findMany({
            where: { name: { contains: word } },
        })
    ))
    return users.flat()
})

export const updateSearchUserIndex = () => {
}
