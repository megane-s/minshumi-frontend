import "server-only";

import { prisma } from "@/prisma";
import { Art } from "@prisma/client";

export const getArt = async (artId: Art["artId"]): Promise<Art | null> => {
    const art = await prisma.art.findFirst({
        where: { artId },
    })
    return art
}
