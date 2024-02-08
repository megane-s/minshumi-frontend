"use server"

import { getSession } from "@/auth/server/auth"
import { deleteBusinessCard } from "@/businessCard/delete"
import { getBusinessCardById } from "@/businessCard/getById"
import { BusinessCardId } from "@/businessCard/type"
import { UpdateBusinessCardParams, canUpdateBusinessCard, updateBusinessCard } from "@/businessCard/update"
import { notImplementError } from "@/util/notImplement"
import { ValidationError } from "@/util/validation"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const handleSaveBusinessCard = async (businessCardId: BusinessCardId, params: UpdateBusinessCardParams) => {
    const [session, prevBusinessCard] = await Promise.all([
        getSession(),
        getBusinessCardById(businessCardId),
    ])
    if (!session) {
        throw notImplementError(`名刺の更新にはログインが必要です。`)
    }
    if (!prevBusinessCard) {
        throw notImplementError(`存在しない名刺を更新しようとしました。`)
    }
    if (prevBusinessCard.userId !== session.user.id) {
        throw notImplementError(`自分が持ち主ではない名刺を編集することはできません。`)
    }
    if (!canUpdateBusinessCard(session.user.id, prevBusinessCard)) {
        throw new ValidationError()
    }
    const newBusinessCard = await updateBusinessCard(businessCardId, session.user.id, params)

    if (params.isPinned) {
        revalidatePath(`/user/${newBusinessCard.userId}`)
        redirect(`/user/${newBusinessCard.userId}`)
    } else {
        redirect(`/settings/user`)
    }
}

export const deleteBusinessCardAction = async (businessCardId: BusinessCardId) => {
    const session = await getSession()
    if (!session) throw notImplementError("ログインしていないユーザによる名刺の削除です")
    const businessCard = await getBusinessCardById(businessCardId)
    if (!businessCard) throw notImplementError(`存在しない名刺を削除しようとしました。`)
    if (businessCard.userId !== session.user.id) throw notImplementError(`名刺の作成者以外は削除できません`)
    await deleteBusinessCard(businessCardId)
    redirect(`/settings/user`)
}

export const handleGotoBusinessCardSettings = async (businessCardId: BusinessCardId, params: UpdateBusinessCardParams) => {
    const [session, prevBusinessCard] = await Promise.all([
        getSession(),
        getBusinessCardById(businessCardId),
    ])
    if (!session) {
        throw notImplementError(`名刺の更新にはログインが必要です。`)
    }
    if (!prevBusinessCard) {
        throw notImplementError(`存在しない名刺を更新しようとしました。`)
    }
    if (prevBusinessCard.userId !== session.user.id) {
        throw notImplementError(`自分が持ち主ではない名刺を編集することはできません。`)
    }
    if (!canUpdateBusinessCard(session.user.id, prevBusinessCard)) {
        throw new ValidationError()
    }
    const newBusinessCard = await updateBusinessCard(businessCardId, session.user.id, params)

    redirect(`/businesscard/${newBusinessCard.businessCardId}/settings`)
}
