import { getRelatedArts } from "@/art/getRelated"
import NewArtRelatedForm from "./NewArtRelatedForm"
import { notFound } from "next/navigation"
import { getArtAppeal } from "@/art/appeal/get"
import { getSession } from "@/auth/server/auth"
import PleaseLogin from "./PleaseLogin"
import { PageTitle } from "@/components/PageTitle"
import { getArt } from "@/art/get"
import { css } from "styled-system/css"
import { RelatedArt } from "@/art/type"
import { getMetadata } from "@/seo/getMetadata"

export async function generateMetadata({ params: { art_id } }: { params: { art_id: string } }) {
    const art = await getArt(art_id)
    if (!art) notFound()
    return getMetadata({
        title: `${art.title}のアピール | みんしゅみ`,
        description: `${art.description}`,
        image: art.imageUrl,
    })
}

interface Props {
    params: { art_id: string }
}

const NewArtRelatedArtPage = async ({ params: { art_id } }: Props) => {
    const session = await getSession()
    if (!session) {
        return <PleaseLogin />
    }
    const [art, relatedArts] = await Promise.all([
        getArtAppeal(art_id, session.user.id)
            .then(async appeal => {
                if (appeal) return appeal
                const art = await getArt(art_id)
                if (!art) return null
                return {
                    ...art,
                    likePoint: null,
                }
            }),
        getRelatedArts(art_id, session.user.id)
            .then(relatedArts => relatedArts.reduce((ans, art) => {
                ans[art.type].push(art)
                return ans
            }, { PREV: [] as RelatedArt[], NEXT: [] as RelatedArt[] })),
    ])
    if (!art) notFound()
    return (
        <div>
            <PageTitle className={css({ mt: "xl !important", mb: "md !important", w: "full", textAlign: "center" })}>
                {art.title} をアピール
            </PageTitle>

            <NewArtRelatedForm
                artId={art.artId}
                title={art.title}
                imageUrl={art.imageUrl}
                defaultValues={{
                    likePoint: art.likePoint ?? "",
                    prev: relatedArts.PREV ?? [],
                    next: relatedArts.NEXT ?? [],
                }}
            />

        </div>
    )
}
export default NewArtRelatedArtPage
