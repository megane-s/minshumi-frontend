import "server-only";

import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { Art, CreateArtParams } from "./type";
// eslint-disable-next-line no-restricted-imports
// eslint-disable-next-line no-restricted-imports

/**
 * 作品を追加する。
 * @param params 追加する作品のtitleとimageUrlを指定する。
 * @returns 追加した作品
 */
export const createArt = async (userId: UserId, { mediaTags, genreTags, otherTags, ...params }: CreateArtParams): Promise<Art> => {
    const newArt = await prisma.art.create({
        data: {
            ...params,
            userId,
        },
        include: {
            tags: true,
        }
    })
    await prisma.$transaction(async prisma => {
        const tags = [
            ...mediaTags.map(tag => ({ artId: newArt.artId, tag, tagType: "MEDIA" }) as const),
            ...genreTags.map(tag => ({ artId: newArt.artId, tag, tagType: "GENRE" }) as const),
            ...otherTags.map(tag => ({ artId: newArt.artId, tag, tagType: "OTHER" }) as const),
        ]
        await prisma.artTag.createMany({
            data: tags,
        })
    })
    return newArt
}
