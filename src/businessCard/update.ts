import { Art, ArtSchema, ArtTag, ArtTagSchema } from "@/art/type";
import { prisma } from "@/prisma";
import { UserId } from "@/user/type";
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from "@prisma/client";
import "server-only";
import { z } from 'zod';
import { BusinessCard, BusinessCardId, BusinessCardSchema } from "./type";

export const UpdateBusinessCardParamsSchema = BusinessCardSchema.extend({
    interestTags: ArtTagSchema.array(),
    likeArts: ArtSchema.shape.title.array(),
}).partial()
export type UpdateBusinessCardParams = z.infer<typeof UpdateBusinessCardParamsSchema>

/**
 * 名刺の内容を更新する。
 * @param businessCardId 名刺の内容を更新する。
 * @param params 更新後の名刺の内容。
 */
export const updateBusinessCard = async (businessCardId: BusinessCardId, params: UpdateBusinessCardParams): Promise<void> => {
    const { interestTags, likeArts, ...businessCardParams } = params
    await prisma.$transaction(async (prisma) => {
        await prisma.businessCard.update({
            where: { businessCardId },
            data: businessCardParams,
        })
        await Promise.all([
            interestTags && updateBusinessCardInterestTags(prisma, businessCardId, interestTags),
            likeArts && updateBusinessCardLikeArts(prisma, businessCardId, likeArts),
        ])
    })
}

const updateBusinessCardInterestTags = async (
    prisma: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
    businessCardId: BusinessCardId,
    interestTags: ArtTag[],
) => {
    await prisma.businessCardInterestTag.deleteMany({
        where: { businessCardId },
    })
    await Promise.all(
        interestTags.map(async (tag) => {
            await prisma.businessCardInterestTag.upsert({
                where: { businessCardId_tag: { businessCardId, tag } },
                create: { tag, businessCardId, },
                update: { tag, businessCardId, },
            })
        })
    )
}

const updateBusinessCardLikeArts = async (
    prisma: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
    businessCardId: BusinessCardId,
    likeArts: Art["title"][],
) => {
    await prisma.businessCardLikeArt.deleteMany({
        where: { businessCardId },
    })
    await Promise.all(
        likeArts?.map(async (artTitle) => {
            await prisma.businessCardLikeArt.upsert({
                where: { businessCardId_likeArtTitle: { businessCardId, likeArtTitle: artTitle } },
                create: { businessCardId, likeArtTitle: artTitle },
                update: { businessCardId, likeArtTitle: artTitle },
            })
        })
    )
}

export const canUpdateBusinessCard = (
    by: UserId,
    prev: BusinessCard,
) => {
    // 作成者以外は更新できない
    if (prev.userId !== by) {
        return false
    }
    return true
}
