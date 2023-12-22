import { getArt } from "@/art/get"
import { EditArtTagForm } from "./EditArtTagForm"
import { notFound } from "next/navigation"
import { getTags } from "@/art/tag/getTags"
import { getGenreTags, medias } from "@/art/components/tag/tags"

interface PageProps {
    params: { art_id: string }
}
const ArtEditTagPage = async ({ params: { art_id } }: PageProps) => {
    const art = await getArt(art_id)
    const tags = await getTags(art_id)
    const mediaTags = medias.filter(media => tags.includes(media))
    const genreTags = getGenreTags(medias).filter(genre => tags.includes(genre))
    const otherTags = tags.filter(other => !mediaTags.includes(other) && !genreTags.includes(other))
    if (!art) notFound()
    return (
        <div>
            <EditArtTagForm
                artId={art_id}
                defaultValues={{
                    mediaTags,
                    genreTags,
                    otherTags,
                }}
            />
        </div>
    )
}
export default ArtEditTagPage
