import { prisma } from "./client"
import { faker } from "./faker"


export const seedArt = async () => {
    await Promise.all([
        seedKimetsu(),
        seedJurujuru(),
        seedKitomayo(),
        seedMyName(),
    ])
}

const seedKimetsu = async () => {
    const artId = "test-art-1"
    await prisma.art.upsert({
        where: { artId },
        update: {},
        create: {
            artId,
            title: "キメツのやばい",
            description: faker.lorem.lines(2),
            imageUrl: "/placeholder/1200x675_red.png",
            authorId: null,
            tags: {
                create: [
                    { tag: "アクション" },
                    { tag: "少年マンガ" },
                    { tag: "マンガ" },
                    { tag: "アニメ" },
                    { tag: "アニメ映画" },
                    { tag: "バトル" },
                    { tag: "週刊少年ジャンプ" },
                ],
            },
            relatedArt: {
                create: [
                    {
                        artId: "test-art-2",
                    },
                ],
            },
        },
    })
}

const seedJurujuru = async () => {
    const artId = "test-art-2"
    await prisma.art.upsert({
        where: { artId },
        update: {},
        create: {
            artId,
            title: "ジュルジュル回線",
            description: faker.lorem.lines(2),
            imageUrl: "/placeholder/1200x675_blue.png",
            authorId: null,
            tags: {
                create: [
                    { tag: "少年マンガ" },
                    { tag: "マンガ" },
                    { tag: "アニメ" },
                    { tag: "アニメ映画" },
                    { tag: "バトル" },
                ],
            },
            relatedArt: {
                create: [
                    {
                        artId: "test-art-1",
                    },
                ],
            },
        },
    })
}

const seedKitomayo = async () => {
    const artId = "test-art-3"
    await prisma.art.upsert({
        where: { artId },
        update: {},
        create: {
            artId,
            title: "きっとマヨネーズでいいのに。",
            description: faker.lorem.lines(4),
            imageUrl: "/placeholder/1200x675_red.png",
            authorId: null,
            tags: {
                create: [
                    { tag: "アーティスト" },
                    { tag: "J-POP" },
                    { tag: "ロック" },
                    { tag: "ジャズ" },
                ],
            },
        },
    })
}

const seedMyName = async () => {
    const artId = "test-art-4"
    await prisma.art.upsert({
        where: { artId },
        update: {},
        create: {
            artId,
            title: "俺の名は。",
            description: faker.lorem.lines(1),
            imageUrl: "/placeholder/1200x675_blue.png",
            authorId: null,
            tags: {
                create: [
                    { tag: "映画" },
                    { tag: "アニメ映画" },
                    { tag: "古海誠" },
                    { tag: "RADMIWPS" },
                ],
            },
        },
    })
}
