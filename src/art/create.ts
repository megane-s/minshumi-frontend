import "server-only";

import { prisma } from "@/prisma";
import { searchApiClient } from "@/search/client";
import { UserId } from "@/user/type";
import { Art, CreateArtParams } from "./type";
// eslint-disable-next-line no-restricted-imports
// eslint-disable-next-line no-restricted-imports

/**
 * 作品を追加する。
 * @param params 追加する作品のtitleとimageUrlを指定する。
 * @returns 追加した作品
 */
export const createArt = async (userId: UserId, { mediaTags, genreTags, otherTags, originalTags, ...params }: CreateArtParams): Promise<Art> => {
    const newArt = await prisma.$transaction(async prisma => {
        const tags = [
            ...mediaTags.map(tag => ({ tag, tagType: "MEDIA" }) as const),
            ...genreTags.map(tag => ({ tag, tagType: "GENRE" }) as const),
            ...otherTags.map(tag => ({ tag, tagType: "OTHER" }) as const),
            ...originalTags.map(tag => ({ tag, tagType: "OTHER" }) as const),
        ]
        const newArt = await prisma.art.create({
            data: {
                ...params,
                userId,
                editHistory: {
                    create: {
                        updateUserId: userId,
                        title: {
                            create: { title: params.title },
                        },
                        description: {
                            create: { description: params.description },
                        },
                        imageUrl: {
                            create: { imageUrl: params.imageUrl },
                        },
                        tags: {
                            create: {
                                tags: tags.map((tag) => tag.tag),
                            },
                        }
                    },
                },
                tags: {
                    createMany: {
                        data: tags,
                    },
                }
            },
            include: {
                editHistory: true,
            }
        })

        // 変更履歴
        return newArt
    })
    void searchApiClient.POST("/search/art/index")
    return newArt
}
