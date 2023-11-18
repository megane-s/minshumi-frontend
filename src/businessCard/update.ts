import { prisma } from "@/prisma";
import { BusinessCard } from "@prisma/client";
import "server-only";
import { z } from 'zod';
import { BusinessCardSchema } from './../prisma/generated/index';

export const UpdateBusinessCardParamsSchema = BusinessCardSchema.partial()
export type UpdateBusinessCardParams = z.infer<typeof UpdateBusinessCardParamsSchema>

export const updateBusinessCard = async (businessCardId: BusinessCard["businessCardId"], params: UpdateBusinessCardParams): Promise<void> => {
    await prisma.businessCard.update({
        where: { businessCardId },
        data: params,
    })
}
