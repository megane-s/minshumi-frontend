import { BusinessCard } from "./type";

export const defaultBusinessCard = {
    backgroundImageUrl: "https://storage.googleapis.com/minshumi-user-content/bg.png",
    canComment: false,
    imageUrl: "https://storage.googleapis.com/minshumi-user-content/tbsten500x500.png",
    rank: null,
    isPublish: false,
    themeColor: "red",
} satisfies Partial<BusinessCard>
