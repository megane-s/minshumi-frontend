"use server"

import { getSession } from "@/auth/server/auth"
import { createBusinessCard } from "@/businessCard/create"
import { defaultBusinessCard } from "@/businessCard/defaults"

export const handleCreateBusinessCard = async (type: string) => {
    const session = await getSession()
    if (!session) {
        // ログインしていない場合は名刺は保存しない
        return
    }
    console.log(defaultBusinessCard, session, type)

    const newBusinessCard = await createBusinessCard(session.user.id, {
        ...defaultBusinessCard,
        name: session.user.name ?? "",
        type: String(type),
    })
    return newBusinessCard
}

