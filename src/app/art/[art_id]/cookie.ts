import { ArtId } from "@/art/type"
import { cookies } from "next/headers"

const key = "isAfterCreated"
export const setLastCreatedArtId = (artId: ArtId) => {
    cookies().set(key, artId)
}
export const getLastCreatedArtId = () => {
    return cookies().get(key)?.value ?? null
}
