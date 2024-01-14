import { getArt } from "@/art/get"
import { EditArtTagForm } from "./EditArtTagForm"
import { notFound } from "next/navigation"
import { getTags } from "@/art/tag/getTags"
import { splitTags } from "@/art/tag/split"

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

