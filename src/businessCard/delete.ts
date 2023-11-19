import { prisma } from "@/prisma";
import "server-only";
import { businessCardId } from "./type";

/**
 * 名刺を削除する。
 * @param businessCardId 削除する名刺のID。
 */
export const deleteBusinessCard = async (businessCardId: businessCardId): Promise<void> => {
    await prisma.businessCard.delete({
        where: { businessCardId },
    })
}
