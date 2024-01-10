import { prisma } from "./client"

export const seedArtAppeal = async () => {
    await Promise.all([
        seedTestUser1ArtAppeal(),
        seedTestUser2ArtAppeal(),
        seedTestUser3ArtAppeal(),
    ])
}

const seedTestUser1ArtAppeal = async () => {
    await Promise.all([
        prisma.artAppeal.upsert({
            where: { userId_artId: { userId: "test-user-1", artId: "test-art-1" } },
            create: {
                userId: "test-user-1",
                artId: "test-art-1",
                likePoint: "主人公のタン二郎がかっこいい！",
            },
            update: {},
        }),
        prisma.artAppeal.upsert({
            where: { userId_artId: { userId: "test-user-1", artId: "test-art-2" } },
            create: {
                userId: "test-user-1",
                artId: "test-art-2",
                likePoint: "面白い",
            },
            update: {},
        }),
    ])
}

const seedTestUser2ArtAppeal = async () => {
    await Promise.all([
        prisma.artAppeal.upsert({
            where: { userId_artId: { userId: "test-user-2", artId: "test-art-3" } },
            create: {
                userId: "test-user-2",
                artId: "test-art-3",
                likePoint: "独特の世界観がいい！",
            },
            update: {},
        }),
    ])
}

const seedTestUser3ArtAppeal = async () => {
    await Promise.all([
        prisma.artAppeal.upsert({
            where: { userId_artId: { userId: "test-user-3", artId: "test-art-4" } },
            create: {
                userId: "test-user-3",
                artId: "test-art-4",
                likePoint: "他にない設定が面白い",
            },
            update: {},
        }),
    ])
}

