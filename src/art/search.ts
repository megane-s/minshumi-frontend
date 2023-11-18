import { notImplementWarn } from "@/util/notImplement"
import { Art } from "@prisma/client"
import "server-only"

/**
 * 未実装。
 * 作品を検索する。
 * @param query 検索ワード。
 * @returns 検索結果の作品一覧。
 */
export const searchArt = async (query: string): Promise<Art[]> => {
    notImplementWarn(`searchArt(${query}) はまだ実装されていません。現状はからの配列を返します。`)
    return []
}
