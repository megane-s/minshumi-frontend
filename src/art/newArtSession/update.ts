import { redisClient } from "@/redis/client"
import { randomId } from "@/util/random"
import "server-only"
import { getNewArtSession } from "./get"
import { NewArtSessionInput } from "./type"

export const updateNewArtSession = async ({ sessionId, session }: { sessionId: string | null, session: NewArtSessionInput }) => {
    if (!sessionId) sessionId = randomId()
    const newArtSession = await getNewArtSession(sessionId) ?? {}
    const newData = {
        ...newArtSession,
        ...session,
    }
    await redisClient.set(sessionId, JSON.stringify(newData))
}
