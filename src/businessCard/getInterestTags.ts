import { prisma } from '@/prisma';
import "server-only";
import { BusinessCardId } from './type';

export const getBusinessCardInterestTags = async (businessCardId: BusinessCardId) => {
    return (
        await prisma.businessCardInterestTag.findMany({
            where: { businessCardId },
        })
            .then(rows => rows.map(row => row.tag))
    )
}
