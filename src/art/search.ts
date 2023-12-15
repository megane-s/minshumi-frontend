import { notImplementWarn } from "@/util/notImplement"
import "server-only"
import { Art } from "./type"
import { prisma } from "@/prisma"
import { sleep } from "@/util/sleep"
import { cache } from "react"

/**
 * 未実装。
 * 作品を検索する。
 * @param query 検索ワード。
 * @returns 検索結果の作品一覧。
 */
export const searchArt = cache(async (query: string): Promise<Art[]> => {
    notImplementWarn(`searchArt(${query}) はまだ実装されていません。現状はからの配列を返します。`)
    await sleep(2000)
    return (await prisma.art.findMany()).filter(()=> Math.random() >= 0.8)
})
