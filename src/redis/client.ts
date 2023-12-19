import "server-only"

import Redis from "ioredis"

export const redis = async <Res>(callback: (client: Redis) => Promise<Res>) => {
    const client = new Redis(process.env._REDIS_NEW_ART_SESSION_URL as string)
    const res = await callback(client)
    await client.quit()
    return res
}
