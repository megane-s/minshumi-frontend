import NewArtProgress from "../NewArtProgress"
import InputTitleForm from "./InputTitleForm"
import NewArtSectionTitle from "../NewArtSectionTitle"
import { getNewArtSession } from "@/art/newArtSession/cookies"

const NewArtTitlePage = async () => {
    const newArtSession = await getNewArtSession()
    return (
        <div>
            <NewArtSectionTitle>
                作品を選択
            </NewArtSectionTitle>

            <InputTitleForm
                defaultValues={{
                    artId: newArtSession?.artId,
                }}
            />

            <NewArtProgress now={0} />
        </div>
    )
}
export default NewArtTitlePage
