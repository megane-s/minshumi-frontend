import "server-only";

import { prisma } from "@/prisma";
import { ArtSchema } from "@/prisma/generated";
import { Art } from "@prisma/client";
import { z } from "zod";

export const CreateArtParamsSchema = ArtSchema.pick({
    title: true,
    imageUrl: true,
})
export type CreateArtParams = z.infer<typeof CreateArtParamsSchema>

/**
 * 作品を追加する。
 * @param params 追加する作品のtitleとimageUrlを指定する。
 * @returns 追加した作品
 */
export const createArt = async (params: CreateArtParams): Promise<Art> => {
    const result = await prisma.art.create({
        data: params,
    })
    return result
}
