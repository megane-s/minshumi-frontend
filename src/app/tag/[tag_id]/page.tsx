//タグごとの作品一覧
import { getArtsWithTag } from "@/art/tag/getArts"
import { ArtListItem } from "./ArtListItem"
import { PageTitle } from "@/components/PageTitle"
import { getMetadata } from "@/seo/getMetadata"
import { Metadata } from "next"

export const metadata: Metadata = getMetadata({
    title: "タグごとの作品",
})

interface PageProps {
    params: { tag_id: string }
}
const pagePage = async ({ params }: PageProps) => {

    const tag = decodeURI(params.tag_id)

    const arts = await getArtsWithTag(tag)

    return (
        <div>
            <PageTitle mt="xs" mb="xs" px={20} py={20}>
                {tag}
            </PageTitle>

            {arts.map(art =>
                <ArtListItem key={art.artId} art={art} />
            )}

            {/* <button>
                <CiCirclePlus size="2rem" />
            </button> */}

        </div>
    )
}
export default pagePage
