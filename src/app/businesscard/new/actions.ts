"use server"

import { getSession } from "@/auth/server/auth"
import { createBusinessCard } from "@/businessCard/create"
import { getDefaultBusinessCard } from "@/businessCard/defaults"
import { redirect } from "next/navigation"

export const handleCreateBusinessCard = async (type: string) => {
    const session = await getSession()
    if (!session) {
        // ログインしていない場合は名刺は保存しない
        redirect(`/businesscard/instant/edit?type=${type}`)
    }

    const defaults = getDefaultBusinessCard()
    const newBusinessCard = await createBusinessCard(session.user.id, {
        ...defaults,
        name: session.user.name ?? "",
        type: String(type),
        imageUrl: session.user.image ?? defaults.imageUrl,
    })
    redirect(`/businesscard/${newBusinessCard?.businessCardId ?? "instant"}/edit`)
}

