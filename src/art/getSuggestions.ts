import { prisma } from "@/prisma"
import "server-only"
import { Art } from "./type"

export const getArtSuggestions = async (query: string): Promise<Art[]> => {
    query = query.replaceAll(/\s/g, "")
    if (query.length <= 0) return await prisma.art.findMany({ take: 5, orderBy: { updateAt: "desc" } })
    const arts = await prisma.art.findMany({
        where: { title: { startsWith: query } },
        take: 10, // TODO
    })
    return arts
}
