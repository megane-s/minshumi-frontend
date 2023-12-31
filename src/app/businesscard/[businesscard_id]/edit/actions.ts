"use server"

import { BusinessCardId } from "@/businessCard/type"
import { UpdateBusinessCardParams, updateBusinessCard } from "@/businessCard/update"

export const handleSaveBusinessCard = async (businessCardId: BusinessCardId, params: UpdateBusinessCardParams) => {
    await updateBusinessCard(businessCardId, params)
}
