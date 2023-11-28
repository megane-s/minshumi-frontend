import { prisma } from "./client"

export const seedWatchingArt = async () => {
    await Promise.all([
        seedTestUser1WatchingArt(),
        seedTestUser2WatchingArt(),
        seedTestUser3WatchingArt(),
    ])
}

const seedTestUser1WatchingArt = async () => {
    await Promise.all([
        prisma.watchingArt.upsert({
            where: { userId_artId: { userId: "test-user-1", artId: "test-art-1" } },
            create: { userId: "test-user-1", artId: "test-art-1" },
            update: {},
        }),
        prisma.watchingArt.upsert({
            where: { userId_artId: { userId: "test-user-1", artId: "test-art-2" } },
            create: { userId: "test-user-1", artId: "test-art-1" },
            update: {},
        }),
    ])
}

const seedTestUser2WatchingArt = async () => {
    await Promise.all([
        prisma.watchingArt.upsert({
            where: { userId_artId: { userId: "test-user-2", artId: "test-art-1" } },
            create: { userId: "test-user-2", artId: "test-art-1" },
            update: {},
        }),
        prisma.watchingArt.upsert({
            where: { userId_artId: { userId: "test-user-2", artId: "test-art-2" } },
            create: { userId: "test-user-2", artId: "test-art-2" },
            update: {},
        }),
    ])
}

const seedTestUser3WatchingArt = async () => {
    await Promise.all([
        prisma.watchingArt.upsert({
            where: { userId_artId: { userId: "test-user-3", artId: "test-art-4" } },
            create: { userId: "test-user-3", artId: "test-art-4" },
            update: {},
        }),
    ])
}

