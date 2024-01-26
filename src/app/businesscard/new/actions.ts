"use server"

import { getSession } from "@/auth/server/auth"
import { createBusinessCard } from "@/businessCard/create"
import { getDefaultBusinessCard } from "@/businessCard/defaults"

export const handleCreateBusinessCard = async (type: string) => {
    const session = await getSession()
    if (!session) {
        // ログインしていない場合は名刺は保存しない
        return
    }

    const defaults = getDefaultBusinessCard()
    const newBusinessCard = await createBusinessCard(session.user.id, {
        ...defaults,
        name: session.user.name ?? "",
        type: String(type),
        imageUrl: session.user.image ?? defaults.imageUrl,
    })
    return newBusinessCard
}

