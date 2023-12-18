import { redis } from "@/redis/client"
import "server-only"
import { NewArtSessionId, NewArtSessionInput, NewArtSessionInputSchema } from "./type"

export const getNewArtSession = async (sessionId: NewArtSessionId): Promise<NewArtSessionInput | null> => {
    const data = await redis(async client => client.get(sessionId))
    if (!data) return null
    const newArtSession = NewArtSessionInputSchema.safeParse(JSON.parse(data))
    return newArtSession.success ? newArtSession.data : null
}
