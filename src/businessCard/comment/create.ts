import { prisma } from "@/prisma";
import { ProfileComment, ProfileCommentSchema } from "@/prisma/generated";
import "server-only";
import { z } from "zod";

export const CreateBusinessCardCommentParamsSchema = ProfileCommentSchema.pick({
    businessCardId: true,
    content: true,
})
export type CreateBusinessCardCommentParams = z.infer<typeof CreateBusinessCardCommentParamsSchema>

export const createBusinessCardComment = async (params: CreateBusinessCardCommentParams): Promise<ProfileComment> => {
    const result = await prisma.profileComment.create({
        data: params,
    })
    return result
}
