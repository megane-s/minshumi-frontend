import { prisma } from "./client"

export const seedRecommendArt = async () => {
    await Promise.all([
        seedTestUser1Recommend(),
        seedTestUser2Recommend(),
        seedTestUser3Recommend(),
    ])
}

const seedTestUser1Recommend = async () => {
    await Promise.all([
        prisma.recommendArt.upsert({
            where: { userId_artId: { userId: "test-user-1", artId: "test-art-1" } },
            create: {
                userId: "test-user-1",
                artId: "test-art-1",
                likePoint: "主人公のタン二郎がかっこいい！",
            },
            update: {},
        }),
        prisma.recommendArt.upsert({
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

const seedTestUser2Recommend = async () => {
    await Promise.all([
        prisma.recommendArt.upsert({
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

const seedTestUser3Recommend = async () => {
    await Promise.all([
        prisma.recommendArt.upsert({
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

