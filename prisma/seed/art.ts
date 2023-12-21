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
            tags: {
                create: [
                    { tag: "アクション", tagType: "GENRE" },
                    { tag: "少年マンガ", tagType: "GENRE" },
                    { tag: "マンガ", tagType: "MEDIA" },
                    { tag: "アニメ", tagType: "MEDIA" },
                    { tag: "アニメ映画", tagType: "MEDIA" },
                    { tag: "バトル", tagType: "GENRE" },
                    { tag: "週刊少年ジャンプ", tagType: "OTHER" },
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
            tags: {
                create: [
                    { tag: "少年マンガ", tagType: "GENRE" },
                    { tag: "マンガ", tagType: "MEDIA" },
                    { tag: "アニメ", tagType: "MEDIA" },
                    { tag: "アニメ映画", tagType: "MEDIA" },
                    { tag: "バトル", tagType: "OTHER" },
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
            tags: {
                create: [
                    { tag: "アーティスト", tagType: "MEDIA" },
                    { tag: "J-POP", tagType: "GENRE" },
                    { tag: "ロック", tagType: "GENRE" },
                    { tag: "ジャズ", tagType: "GENRE" },
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
            tags: {
                create: [
                    { tag: "映画", tagType: "MEDIA" },
                    { tag: "アニメ映画", tagType: "MEDIA" },
                    { tag: "古海誠", tagType: "OTHER" },
                    { tag: "RADMIWPS", tagType: "OTHER" },
                ],
            },
        },
    })
}
