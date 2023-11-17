import { prisma } from "@/prisma";
import { BusinessCardComment, BusinessCardCommentSchema } from "@/prisma/generated";
import "server-only";
import { z } from "zod";

export const CreateBusinessCardCommentParamsSchema = BusinessCardCommentSchema.pick({
    businessCardId: true,
    content: true,
})
export type CreateBusinessCardCommentParams = z.infer<typeof CreateBusinessCardCommentParamsSchema>

export const createBusinessCardComment = async (params: CreateBusinessCardCommentParams): Promise<BusinessCardComment> => {
    const result = await prisma.businessCardComment.create({
        data: params,
    })
    return result
}
