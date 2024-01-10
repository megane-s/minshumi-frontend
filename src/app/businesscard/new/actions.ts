"use server"

import { getSession } from "@/auth/server/auth"
import { createBusinessCard } from "@/businessCard/create"
import { defaultBusinessCard } from "@/businessCard/defaults"

export const handleCreateBusinessCard = async (type: number) => {
    const session = await getSession()
    if (!session) {
        // ログインしていない場合は名刺は保存しない
        return
    }
    const newBusinessCard = await createBusinessCard(session?.user.id ?? null, {
        ...defaultBusinessCard,
        name: session.user.name ?? "",
        type: String(type),
    })
    return newBusinessCard
}

