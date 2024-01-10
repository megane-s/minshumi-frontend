"use server"

import { getSession } from "@/auth/server/auth"
import { createBusinessCard } from "@/businessCard/create"

export const handleCreateBusinessCard = async (type: number) => {
    const session = await getSession()
    if (!session) {
        // ログインしていない場合は名刺は保存しない
        return
    }
    const newBusinessCard = await createBusinessCard(session?.user.id ?? null, {
        backgroundImageUrl: "https://storage.googleapis.com/minshumi-user-content/bg.png",
        canComment: false,
        imageUrl: "https://storage.googleapis.com/minshumi-user-content/tbsten500x500.png",
        name: session.user.name ?? "",
        rank: null,
        isPublish: false,
        themeColor: "red",
        type: String(type),
    })
    return newBusinessCard
}
