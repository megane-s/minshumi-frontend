import "server-only";
import { BusinessCard } from './../prisma/generated/index';

import { prisma } from "@/prisma";
import { BusinessCardSchema } from "@/prisma/generated";
import { User } from "@prisma/client";
import { z } from "zod";

export const CreateBusinessParamsSchema = BusinessCardSchema.pick({
    backgroundImageUrl: true,
    canComment: true,
})
export type CreateBusinessParams = z.infer<typeof CreateBusinessParamsSchema>

export const createBusinessCard = async (authorId: User["id"], params: CreateBusinessParams): Promise<BusinessCard> => {
    const result = await prisma.businessCard.create({
        data: {
            userId: authorId,
            backgroundImageUrl: params.backgroundImageUrl,
            canComment: params.canComment,
        },
    })
    return result
}
