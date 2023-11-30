import NewArtProgress from "../NewArtProgress"
import InputTitleForm from "./InputTitleForm"
import NewArtSectionTitle from "../NewArtSectionTitle"
import { getNewArtSession } from "@/art/newArtSession/cookies"

const NewArtTitlePage = async () => {
    const newArtSession = await getNewArtSession()
    return (
        <div>
            <NewArtSectionTitle>
                1. タイトルを入力
            </NewArtSectionTitle>

            <InputTitleForm defaultValues={{ title: newArtSession?.title ?? "" }} />

            <NewArtProgress now={0} />
        </div>
    )
}
export default NewArtTitlePage
