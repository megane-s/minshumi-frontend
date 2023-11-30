import { redisClient } from "@/redis/client"
import "server-only"
import { NewArtSessionId, NewArtSessionInputSchema } from "./type"

export const getNewArtSession = async (sessionId: NewArtSessionId) => {
    const data = await redisClient.get(sessionId)
    if (!data) return null
    const newArtSession = NewArtSessionInputSchema.safeParse(JSON.parse(data))
    return newArtSession.success ? newArtSession.data : null
}
