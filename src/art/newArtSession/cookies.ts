import { randomId } from "@/util/random"
import { cookies } from "next/headers"
import { getNewArtSession as originGetNewArtSession } from "./get"
import { NewArtSessionInput } from "./type"
import { updateNewArtSession as originalUpdateNewArtSession } from "./update"

const COOKIE_KEY = "new-art-session-id"

export const updateNewArtSession = async (input: NewArtSessionInput) => {
    const sessionId = cookies().get(COOKIE_KEY)?.value ?? randomId()
    cookies().set(COOKIE_KEY, sessionId)
    await originalUpdateNewArtSession({
        sessionId,
        session: input,
    })
}

export const getNewArtSession = async () => {
    const sessionId = cookies().get(COOKIE_KEY)?.value
    if (!sessionId) return null
    return await originGetNewArtSession(sessionId)
}

export const deleteNewArtSession = async () => {
    cookies().delete(COOKIE_KEY)
}
