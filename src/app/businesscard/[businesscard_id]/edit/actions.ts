"use server"

import { getSession } from "@/auth/server/auth"
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
