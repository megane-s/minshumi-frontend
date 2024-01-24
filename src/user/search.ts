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
    const artIds = await searchApiClient.GET("/search/art", {
        params: {
            query: { q: query },
        },
    }).then(r => r.data)
    if (!artIds) {
        throw notImplementError("検索サーバのエラー")
    }
    const arts = await Promise.all(
        artIds.map(artId => getUser(artId))
    )
    return arts.filter((art): art is User => !!art)
})


