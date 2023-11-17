import { prisma } from "@/prisma";
import "server-only";
import { BusinessCard } from './../prisma/generated/index';

export const deleteBusinessCard = async (businessCardId: BusinessCard["businessCardId"]): Promise<void> => {
    await prisma.businessCard.delete({
        where: { businessCardId },
    })
}
