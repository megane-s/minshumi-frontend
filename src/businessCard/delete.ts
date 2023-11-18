import { prisma } from "@/prisma";
import "server-only";
import { BusinessCard } from './../prisma/generated/index';

/**
 * 名刺を削除する。
 * @param businessCardId 削除する名刺のID。
 */
export const deleteBusinessCard = async (businessCardId: BusinessCard["businessCardId"]): Promise<void> => {
    await prisma.businessCard.delete({
        where: { businessCardId },
    })
}
