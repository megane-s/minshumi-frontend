import { notImplementWarn } from "@/util/notImplement"
import { User } from "@prisma/client"
import "server-only"

/**
 * 未実装。
 * ユーザを検索する。
 * @param query 検索ワード。
 * @returns 検索結果のユーザ一覧。
 */
export const searchUser = async (query: string): Promise<User[]> => {
    notImplementWarn(`searchUser(${query}) はまだ実装されていません。現状はからの配列を返します。`)
    return []
}
