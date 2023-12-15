import { Metadata } from "next"

export const getMetadata = ({
    title = "みんしゅみ",
    description = "みんなの趣味部屋です。",
    twitter,
}: Partial<{
    title: string,
    description: string,
    twitter: Metadata["twitter"],
}> = {}): Metadata => ({
    title: title,
    description: description,
    openGraph: {
        title: title,
        description: description,
    },
    twitter: {
        title: title,
        description: description,
        card: "summary_large_image",
        ...twitter,
    },
})
