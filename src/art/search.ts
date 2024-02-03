import { prisma } from "@/prisma"
import { cache } from "react"
import "server-only"
import { Art } from "./type"

/**
 * 作品を検索する。
 * @param query 検索ワード。
 * @returns 検索結果の作品一覧。
 */
export const searchArt = cache(async (query: string): Promise<Art[]> => {
    const q_words = query.split(/\s/g)
    const arts = await Promise.all(q_words.map(word =>
        prisma.art.findMany({
            where: {
                OR: [
                    { title: { contains: word } },
                    { description: { contains: word } },
                ]
            },
        })
    ))
    return arts.flat()
})

