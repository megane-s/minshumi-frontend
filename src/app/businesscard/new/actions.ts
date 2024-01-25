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

    const newBusinessCard = await createBusinessCard(session.user.id, {
        ...getDefaultBusinessCard(),
        name: session.user.name ?? "",
        type: String(type),
    })
    return newBusinessCard
}

