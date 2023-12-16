import { redis } from "@/redis/client"
import "server-only"
import { NewArtSessionId, NewArtSessionInputSchema } from "./type"

export const getNewArtSession = async (sessionId: NewArtSessionId) => {
    const data = await redis(async client => client.get(sessionId))
    if (!data) return null
    const newArtSession = NewArtSessionInputSchema.partial().safeParse(JSON.parse(data))
    return newArtSession.success ? newArtSession.data : null
}
