import { searchApiClient } from "@/search/client"
import { notImplementError } from "@/util/notImplement"
import { cache } from "react"
import "server-only"
import { getUser } from "./get"
import { User } from "./type"

/**
 * 未実装。
 * ユーザを検索する。
 * @param query 検索ワード。
 * @returns 検索結果のユーザ一覧。
 */
export const searchUser = cache(async (query: string): Promise<User[]> => {
    const userIds = await searchApiClient.GET("/search/user", {
        params: {
            query: { q: query },
        },
    }).then(r => r.data)
    if (!userIds) {
        throw notImplementError("検索サーバのエラー")
    }
    console.log("query", query)
    console.log("userIds", userIds)
    const users = await Promise.all(
        userIds.map(userId => getUser(userId))
    )
    return users.filter((user): user is User => !!user)
})

export const updateSearchUserIndex = () => {
    void searchApiClient.POST("/search/user/index")
}
