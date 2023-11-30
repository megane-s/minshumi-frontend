import "server-only"

import Redis from "ioredis"

export const redisClient = new Redis(process.env.REDIS_NEW_ART_SESSION_URL as string)
