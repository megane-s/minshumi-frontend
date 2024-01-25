import { Metadata } from "next"

export const getMetadata = ({
    title = "みんしゅみ",
    description = "みんなの趣味部屋です。",
    image = "https://minshumi.com/logo-rect.png",
    twitter,
}: Partial<{
    title: string
    description: string
    image: string
    twitter: Metadata["twitter"]
}> = {}): Metadata => ({
    title: title,
    description: description,
    openGraph: {
        title: title,
        description: description,
        images: image,
    },
    twitter: {
        title: title,
        description: description,
        card: "summary_large_image",
        images: [
            {
                url: image ?? "https://storage.googleapis.com/minshumi-user-content/logo-rect-1200x675.png",
                width: 1200,
                height: 675,
            },
        ],
        ...twitter,
    },
})
