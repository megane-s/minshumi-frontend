
import { getNewArtSession } from "@/art/newArtSession/cookies"
import NewArtProgress from "../NewArtProgress"
import NewArtSectionTitle from "../NewArtSectionTitle"
import NewArtTagForm from "./NewArtTagForm"

const NewArtTagPage = async () => {
    const newArtSession = await getNewArtSession()
    return (
        <div>
            <NewArtSectionTitle>
                タグを設定
            </NewArtSectionTitle>

            <NewArtTagForm
                defaultValues={{
                    mediaTags: newArtSession?.mediaTags ?? [],
                    genreTags: newArtSession?.genreTags ?? [],
                    otherTags: newArtSession?.otherTags ?? [],
                }}
            />

            <NewArtProgress now={2} />

        </div>
    )
}
export default NewArtTagPage
