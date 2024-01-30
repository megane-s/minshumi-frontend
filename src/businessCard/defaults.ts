import { BusinessCard } from "./type";

const bg = [
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-1-1.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-1-2.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-1-3.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-1-4.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-1-5.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-1-6.png",

    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-2-1.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-2-2.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-2-3.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-2-4.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-2-5.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-2-6.png",

    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-3-1.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-3-2.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-3-3.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-3-4.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-3-5.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/bg-3-6.png",
]
const icon = [
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/icon-1.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/icon-2.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/icon-3.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/icon-4.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/icon-5.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/icon-6.png",
    "https://storage.googleapis.com/minshumi-user-content/businesscard-default/icon-7.png",
]

export const getDefaultBusinessCard = () => ({
    backgroundImageUrl: bg[Math.floor(Math.random() * bg.length)],
    canComment: false,
    imageUrl: icon[Math.floor(Math.random() * icon.length)],
    rank: null,
    isPublish: false,
    themeColor: "red",
} satisfies Partial<BusinessCard>)
