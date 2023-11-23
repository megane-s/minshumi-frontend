import NewArtNavigation from "../Navigation"
import NewArtProgress from "../NewArtProgress"
import InputDetailForm from "./InputDetailForm"

const NewArtDetailPage = () => {
    return (
        <div>
            <InputDetailForm
                defaultValues={{
                    title: "",
                    description: "",
                    likePoint: "",
                }}
            />

            <NewArtProgress now={2} />

            <NewArtNavigation
                prevHref="/art/new/title#"
                nextHref="/art/new/tag#"
            />
        </div>
    )
}
export default NewArtDetailPage
