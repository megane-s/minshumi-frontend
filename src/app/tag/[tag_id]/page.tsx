import { getArtsWithTag } from "@/art/tag/getArts"
import { ArtListItem } from "./ArtListItem"
import { PageTitle } from "@/components/PageTitle"

interface PageProps {
    params: { tag_id: string }
}
const pagePage = async ({ params }: PageProps) => {

    const tag = decodeURI(params.tag_id)

    const arts = await getArtsWithTag(tag)

    console.log("tag", tag)
    console.log("arts", arts)
    return (
        <div>
            <PageTitle>{tag}</PageTitle>

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
