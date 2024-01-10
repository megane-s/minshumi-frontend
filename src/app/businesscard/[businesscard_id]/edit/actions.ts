"use server"

import { getSession } from "@/auth/server/auth"
import { getBusinessCardById } from "@/businessCard/getById"
import { BusinessCardId } from "@/businessCard/type"
import { UpdateBusinessCardParams, canUpdateBusinessCard, updateBusinessCard } from "@/businessCard/update"
import { notImplementError } from "@/util/notImplement"
import { ValidationError } from "@/util/validation"

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
    if (!canUpdateBusinessCard(session.user.id, prevBusinessCard)) {
        throw new ValidationError()
    }
    await updateBusinessCard(businessCardId, params)
}
