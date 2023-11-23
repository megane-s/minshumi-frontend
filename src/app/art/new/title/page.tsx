import NewArtProgress from "../NewArtProgress"
import InputTitleForm from "./InputTitleForm"

const NewArtTitlePage = () => {
    return (
        <div>
            <InputTitleForm />

            <NewArtProgress now={1} />
        </div>
    )
}
export default NewArtTitlePage
