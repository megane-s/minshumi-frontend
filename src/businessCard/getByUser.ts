import { prisma } from "@/prisma";
import { User } from "@prisma/client";
import "server-only";
import { BusinessCard } from './../prisma/generated/index';

/**
 * 指定したユーザが作成した名刺の一覧を取得する。
 * @param userId 指定するユーザ。
 * @returns 指定したユーザが作成した名刺の一覧。
 */
export const getBusinessCardByUser = async (userId: User["id"]): Promise<BusinessCard[]> => {
    const results = await prisma.businessCard.findMany({
        where: { userId },
    })
    return results.map(result => result)
}
