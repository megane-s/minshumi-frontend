import NewArtNavigation from "../Navigation"
import NewArtProgress from "../NewArtProgress"
import NewArtSectionTitle from "../NewArtSectionTitle"
import NewArtRelatedForm from "./NewArtRelatedForm"

const NewArtRelatedArtPage = () => {
    return (
        <div>
            <NewArtSectionTitle>
                4. 前後に見た作品
            </NewArtSectionTitle>

            <NewArtRelatedForm />

            <NewArtNavigation
                prevHref="/art/new/tag#"
                nextHref="/art/new/"
            />

            <NewArtProgress now={4} />
        </div>
    )
}
export default NewArtRelatedArtPage
