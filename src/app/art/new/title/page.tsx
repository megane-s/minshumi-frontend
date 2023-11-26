import NewArtProgress from "../NewArtProgress"
import InputTitleForm from "./InputTitleForm"
import NewArtSectionTitle from "../NewArtSectionTitle"

const NewArtTitlePage = () => {
    return (
        <div>
            <NewArtSectionTitle>
                1. タイトルを入力
            </NewArtSectionTitle>

            <InputTitleForm />

            <NewArtProgress now={0} />
        </div>
    )
}
export default NewArtTitlePage
