import { searchApiClient } from "@/search/client"
import { notImplementError } from "@/util/notImplement"
import { cache } from "react"
import "server-only"
import { getArt } from "./get"
import { Art } from "./type"

/**
 * 未実装。
 * 作品を検索する。
 * @param query 検索ワード。
 * @returns 検索結果の作品一覧。
 */
export const searchArt = cache(async (query: string): Promise<Art[]> => {
    const artIds = await searchApiClient.GET("/search/art", {
        params: {
            query: { q: query },
        },
    }).then(r => r.data)
    if (!artIds) {
        throw notImplementError("検索サーバのエラー")
    }
    const arts = await Promise.all(
        artIds.map(artId => getArt(artId))
    )
    return arts.filter((art): art is Art => !!art)
})
