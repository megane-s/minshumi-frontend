import { UserId } from '@/user/type';
import "server-only";

import { prisma } from "@/prisma";
import { notImplementError } from '@/util/notImplement';
// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';
import { z } from "zod";
import { Art, ArtId, ArtSchema } from "./type";

export const UpdateArtParamsSchema = ArtSchema.extend({
    editLog: z.boolean(),
}).partial()
export type UpdateArtParams = z.infer<typeof UpdateArtParamsSchema>

/**
 * 作品を更新する。
 * @param artId 更新対象の作品のID。
 * @param art 更新内容。
 * @returns 更新後の作品。
 */
export const updateArt = async (artId: ArtId, by: UserId, params: UpdateArtParams): Promise<Art> => {
    const { editLog = true, ...art } = UpdateArtParamsSchema.parse(params)
    const result = await prisma.$transaction(async prisma => {
        const prevArt = await prisma.art.findUnique({
            where: { artId },
        })
        if (!prevArt) throw notImplementError(`Art (artId=${artId}) is not exists`)
        // 変更履歴の追加
        if (editLog) {
            await createEditHistory(prisma, artId, by, prevArt, art)
        }
        const newArt = await prisma.art.update({
            where: { artId: artId },
            data: art,
        })
        return newArt
    })
    return result
}

const createEditHistory = async (
    prisma: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
    artId: ArtId,
    by: UserId,
    prevArt: Art,
    art: Omit<UpdateArtParams, "editLog">,
) => {
    const editHistory = await prisma.artEditHistory.create({
        data: {
            artId,
            updateUserId: by,
        },
    })
    const createEditDetailsPromises: Promise<unknown>[] = []
    if (art.title && art.title !== prevArt.title) {
        createEditDetailsPromises.push(
            prisma.artTitleEditHistory.create({
                data: {
                    artId: editHistory.artId,
                    updateAt: editHistory.updateAt,
                    title: art.title,
                },
            })
        )
    }
    if (art.imageUrl && art.imageUrl !== prevArt.imageUrl) {
        createEditDetailsPromises.push(
            prisma.artImageUrlEditHistory.create({
                data: {
                    artId: editHistory.artId,
                    updateAt: editHistory.updateAt,
                    imageUrl: art.imageUrl,
                },
            })
        )
    }
    if (art.description && art.description !== prevArt.description) {
        createEditDetailsPromises.push(
            prisma.artDescriptionEditHistory.create({
                data: {
                    artId: editHistory.artId,
                    updateAt: editHistory.updateAt,
                    description: art.description,
                },
            })
        )
    }
    await Promise.all(createEditDetailsPromises)
}

export const canUpdateArt = async (by: UserId | null, prevArt: Art, input: UpdateArtParams) => {
    if (!by) return false
    // タイトルは作成者以外変更できない
    const hasUpdateTitle = typeof input.title === "string" && prevArt.title !== input.title
    if (hasUpdateTitle && by !== prevArt.userId) {
        return false
    }
    return true
}
