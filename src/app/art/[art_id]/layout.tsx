import { getArt } from "@/art/get"
import { getMetadata } from "@/seo/getMetadata"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

export async function generateMetadata({ params: { art_id } }: { params: { art_id: string } }) {
    const art = await getArt(art_id)
    if (!art) notFound()
    return getMetadata({
        title: `${art.title} | みんしゅみ`,
        description: `${art.description}`,
        image: art.imageUrl,
    })
}

interface PageProps {
    children: ReactNode
}
const ArtLayoutPage = ({ children }: PageProps) => {
    return (
        children
    )
}
export default ArtLayoutPage