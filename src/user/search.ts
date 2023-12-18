import { notImplementWarn } from "@/util/notImplement"
import "server-only"
import { User } from "./type"
import { sleep } from "@/util/sleep"
import { prisma } from "@/prisma"

/**
 * 未実装。
 * ユーザを検索する。
 * @param query 検索ワード。
 * @returns 検索結果のユーザ一覧。
 */
export const searchUser = async (query: string): Promise<User[]> => {
    notImplementWarn(`searchUser(${query}) はまだ実装されていません。現状はからの配列を返します。`)
    await sleep(2000)
    return (await prisma.user.findMany()).filter(() => Math.random() >= 0.8)
}

