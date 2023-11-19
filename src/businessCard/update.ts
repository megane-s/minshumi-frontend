import { prisma } from "@/prisma";
import "server-only";
import { z } from 'zod';
import { BusinessCardId, BusinessCardSchema } from "./type";

export const UpdateBusinessCardParamsSchema = BusinessCardSchema.partial()
export type UpdateBusinessCardParams = z.infer<typeof UpdateBusinessCardParamsSchema>

/**
 * 名刺の内容を更新する。
 * @param businessCardId 名刺の内容を更新する。
 * @param params 更新後の名刺の内容。
 */
export const updateBusinessCard = async (businessCardId: BusinessCardId, params: UpdateBusinessCardParams): Promise<void> => {
    await prisma.businessCard.update({
        where: { businessCardId },
        data: params,
    })
}
