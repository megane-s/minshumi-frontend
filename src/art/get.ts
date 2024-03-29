import "server-only";

import { prisma } from "@/prisma";
import { Art, ArtId } from "./type";

export const getArt = async (artId: ArtId): Promise<Art | null> => {
    const art = await prisma.art.findFirst({
        where: { artId },
        orderBy: {
            updateAt: "desc",
        },
    })
    return art
}

export const getArts = async ({ limit = 10_000 }: Partial<{ limit: number }> = {}) => {
    return await prisma.art.findMany({
        orderBy: {
            updateAt: "desc",
        },
        take: limit,
    })
}
