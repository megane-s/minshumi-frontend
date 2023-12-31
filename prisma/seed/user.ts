import { prisma } from "./client"
import { faker } from "./faker"

export const seedUser = async () => {
    await Promise.all([
        newSeedUser("test-user-1", 1),
        newSeedUser("test-user-2", 1),
        newSeedUser("test-user-3", 0),
        newSeedUser("test-user-4", 2),
        newSeedUser("test-user-5", 0),
    ])
}

export const newSeedUser = async (id: string, businessCardCount: number) => {
    const name = faker.person.fullName()
    await prisma.user.upsert({
        where: { id },
        update: {},
        create: {
            id,
            name,
            image: faker.image.url(),
            email: faker.internet.email(),
            emailVerified: faker.date.anytime(),
            accounts: {
                create: [
                    {
                        id: id + "-account-0",
                        type: "oauth",
                        provider: "google",
                        providerAccountId: id + "-google-account-id",
                        refresh_token: "***refresh*token***",
                        access_token: "***access*token***",
                        expires_at: new Date("2025-01-01T00:00:00.000Z").valueOf() / 1000,
                        token_type: "Bearer",
                        scope: "https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
                        id_token: "***id*token***",
                        session_state: null,
                    },
                ]
            },
            businessCards: {
                create: Array.from({ length: businessCardCount }, (_, i) => i)
                    .map(i => ({
                        businessCardId: `business-card-${id}-${i}`,
                        imageUrl: faker.image.url({ width: 1200, height: 675 }),
                        backgroundImageUrl: faker.image.url(),
                        canComment: faker.datatype.boolean(),
                        isPublish: false,
                        name,
                        rank: Math.random() >= 0.5 ? "アクションマスター" : null,
                        themeColor: "red",
                        type: "1",
                        interestTags: {
                            createMany: {
                                data: faker.helpers.arrayElements([
                                    { tag: "アクション" },
                                    { tag: "SF" },
                                    { tag: "ジャンプ" },
                                ]),
                            },
                        }
                    })),
            },
            ranks: {
                create: faker.helpers.arrayElements([
                    { rank: "アニメマスター" },
                    { rank: "アクションマスター" },
                    { rank: "音楽マスター" },
                    { rank: "映画マスター" },
                    { rank: "恋愛マスター" },
                    { rank: "ファンタジーマスター" },
                    { rank: "ミステリーマスター" },
                    { rank: "ジャンプマスター" },
                ]),
            },
            watchingArts: {
                create: faker.helpers.arrayElements([
                    { artId: "test-art-1" },
                    { artId: "test-art-2" },
                    { artId: "test-art-3" },
                    { artId: "test-art-4" },
                ]),
            },
            interestTags: {
                create: faker.helpers.arrayElements([
                    { tag: "アニメ" },
                    { tag: "アクション" },
                    { tag: "音楽" },
                    { tag: "映画" },
                    { tag: "恋愛" },
                    { tag: "ファンタジー" },
                    { tag: "ミステリー" },
                    { tag: "ジャンプ" },
                ]),
            },
            recommendedArts: {
                create: faker.helpers.arrayElements([
                    { artId: "test-art-1", likePoint: faker.lorem.lines(1) },
                    { artId: "test-art-2", likePoint: faker.lorem.lines(2) },
                    { artId: "test-art-3", likePoint: faker.lorem.lines(1) },
                    { artId: "test-art-4", likePoint: faker.lorem.lines(3) },
                ]),
            },
        },
    })
}
