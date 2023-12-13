import { prisma } from "@/prisma";
import "server-only";
import { BusinessCard, BusinessCardId } from "./type";

/**
 * TODO
 */
export const getBusinessCardById = async (businessCardId: BusinessCardId): Promise<BusinessCard | null> => {
    const result = await prisma.businessCard.findUnique({
        where: { businessCardId },
    })
    return result
}
