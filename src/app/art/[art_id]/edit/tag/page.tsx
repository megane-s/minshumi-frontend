import { getArt } from "@/art/get"
import { EditArtTagForm } from "./EditArtTagForm"
import { notFound } from "next/navigation"
import { getTags } from "@/art/tag/getTags"
import { splitTags } from "@/art/tag/split"
import { getMetadata } from "@/seo/getMetadata"

export async function generateMetadata({ params: { art_id } }: { params: { art_id: string } }) {
    const art = await getArt(art_id)
    if (!art) notFound()
    return getMetadata({
        title: `${art.title}のタグの編集 | みんしゅみ`,
        description: `${art.description}`,
        image: art.imageUrl,
    })
}

interface PageProps {
    params: { art_id: string }
}
const ArtEditTagPage = async ({ params: { art_id } }: PageProps) => {
    const [art, tags] = await Promise.all([
        getArt(art_id),
        getTags(art_id),
    ])
    const { mediaTags, genreTags, otherTags, originalTags } = splitTags(tags)
    if (!art) notFound()
    return (
        <div>
            <EditArtTagForm
                artId={art_id}
                defaultValues={{
                    mediaTags,
                    genreTags,
                    otherTags,
                    originalTags,
                }}
            />
        </div>
    )
}
export default ArtEditTagPage

