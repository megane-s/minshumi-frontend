import { getArt } from "@/art/get"
import { EditArtTagForm } from "./EditArtTagForm"
import { notFound } from "next/navigation"
import { getTags } from "@/art/tag/getTags"
import { getGenreTags, medias, others } from "@/art/components/tag/tags"
import { ArtTag } from "@/art/type"

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

const splitTags = (tags: ArtTag[]) => {
    const mediaTags: ArtTag[] = []
    const genreTags: ArtTag[] = []
    const otherTags: ArtTag[] = []
    // media と other
    const notGroupedTags: ArtTag[] = []
    tags.forEach((tag) => {
        if (medias.includes(tag)) {
            mediaTags.push(tag)
        } else if (others.includes(tag)) {
            otherTags.push(tag)
        } else {
            notGroupedTags.push(tag)
        }
    })
    // genre
    const genres = getGenreTags(mediaTags)
    notGroupedTags.forEach((tag, index) => {
        if (genres.includes(tag)) {
            genreTags.push(tag)
            notGroupedTags.splice(index, 1)
        }
    })
    // originalTags
    const originalTags: ArtTag[] = notGroupedTags
    return {
        mediaTags,
        genreTags,
        otherTags,
        originalTags,
    }
}
