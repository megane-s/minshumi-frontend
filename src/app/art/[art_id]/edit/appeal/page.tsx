import { ArtId, RelatedArt } from "@/art/type"
import { notFound } from "next/navigation"
import { EditArtRelatedForm } from "./EditArtRelatedForm"
import { getRelatedArts } from "@/art/getRelated"
import { getRecommendArtsByUser } from "@/art/recommend/getByUser"
import { getRecommendArt } from "@/art/recommend/get"

interface PageProps {
    params: { art_id: ArtId }
}
const ArtAppealEditPage = async ({ params: { art_id } }: PageProps) => {
    getRecommendArtsByUser
    const [recommendArt, relatedArts] = await Promise.all([
        getRecommendArt(art_id),
        getRelatedArts(art_id)
            .then(relatedArts => {
                return splitPrevAndNext(relatedArts)
            }),
    ])
    if (!recommendArt) notFound()
    return (
        <div>
            <EditArtRelatedForm
                defaultValues={{
                    likePoint: recommendArt.likePoint,
                    prevArts: relatedArts.prev,
                    nextArts: relatedArts.next,
                }}
            />
        </div>
    )
}
export default ArtAppealEditPage

const splitPrevAndNext = (relatedArts: RelatedArt[]) => {
    return relatedArts.reduce((result, relatedArt) => {
        if (relatedArt.type === "PREV") {
            result.prev.push(relatedArt)
        } else {
            result.next.push(relatedArt)
        }
        return result
    }, { prev: [], next: [] } as { prev: RelatedArt[], next: RelatedArt[] })
}
