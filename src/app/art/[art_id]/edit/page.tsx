import { getArt } from "@/art/get"
import { getMetadata } from "@/seo/getMetadata"
import { notFound, redirect } from "next/navigation"

export async function generateMetadata({ params: { art_id } }: { params: { art_id: string } }) {
    const art = await getArt(art_id)
    if (!art) notFound()
    return getMetadata({
        title: `${art.title}の編集 | みんしゅみ`,
        description: `${art.description}`,
        image: art.imageUrl,
    })
}
interface PageProps {
    params: { art_id: string }
}
const ArtEditPage = ({ params: { art_id } }: PageProps) => {
    redirect(`/art/${art_id}/edit/detail`)
}
export default ArtEditPage
