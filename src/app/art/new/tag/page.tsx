
import NewArtProgress from "../NewArtProgress"
import NewArtSectionTitle from "../NewArtSectionTitle"
import NewArtTagForm from "./NewArtTagForm"

const NewArtTagPage = () => {
    return (
        <div>
            <NewArtSectionTitle>
                3. タグを設定
            </NewArtSectionTitle>

            <NewArtTagForm
            />

            <NewArtProgress now={2} />

        </div>
    )
}
export default NewArtTagPage
