import { prisma } from "@/prisma";
import { User } from "@prisma/client";
import "server-only";
import { BusinessCard } from './../prisma/generated/index';

export const getBusinessCardByUser = async (userId: User["id"]): Promise<BusinessCard[]> => {
    const results = await prisma.businessCard.findMany({
        where: { userId },
    })
    return results.map(result => result)
}
