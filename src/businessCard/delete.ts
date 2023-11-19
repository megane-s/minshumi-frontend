import { prisma } from "@/prisma";
import "server-only";
import { BusinessCardId } from "./type";

/**
 * 名刺を削除する。
 * @param businessCardId 削除する名刺のID。
 */
export const deleteBusinessCard = async (businessCardId: BusinessCardId): Promise<void> => {
    await prisma.businessCard.delete({
        where: { businessCardId },
    })
}
