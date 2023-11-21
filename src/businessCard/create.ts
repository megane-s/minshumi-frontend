import "server-only";

import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
import { z } from "zod";
import { BusinessCard, BusinessCardSchema } from "./type";

export const CreateBusinessParamsSchema = BusinessCardSchema.pick({
    backgroundImageUrl: true,
    canComment: true,
    imageUrl: true,
})
export type CreateBusinessParams = z.infer<typeof CreateBusinessParamsSchema>

/**
 * 名刺を作成する。
 * @param authorId 作成するユーザのID。
 * @param params 名刺の内容。
 * @returns 作成した名刺。
 */
export const createBusinessCard = async (authorId: UserId, params: CreateBusinessParams): Promise<BusinessCard> => {
    const result = await prisma.businessCard.create({
        data: {
            userId: authorId,
            ...params,
        },
    })
    return result
}
