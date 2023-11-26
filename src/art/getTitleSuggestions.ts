import { prisma } from "@/prisma"
import "server-only"
import { Art } from "./type"

export const getTitleSuggestions = async (query: string): Promise<Art["title"][]> => {
    query = query.replaceAll(/\s/g, "")
    if (query.length <= 0) return ["キメツのやばい", "ジュルジュル回線", "きっとマヨネーズでいいのに。"]
    const arts = await prisma.art.findMany({
        select: { title: true },
        where: { title: { startsWith: query } },
    })
    console.log(query, arts)
    return arts.map(art => art.title)
}
