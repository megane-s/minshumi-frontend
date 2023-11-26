import NewArtNavigation from "../Navigation"
import NewArtProgress from "../NewArtProgress"
import NewArtSectionTitle from "../NewArtSectionTitle"
import InputDetailForm from "./InputDetailForm"

const NewArtDetailPage = () => {
    return (
        <div>
            <NewArtSectionTitle>
                2. 作品の詳細を入力
            </NewArtSectionTitle>

            <InputDetailForm
                defaultValues={{
                    title: "",
                    description: "",
                    likePoint: "",
                    imageUrl: "/placeholder/300x200_red.png",
                }}
            />

            <NewArtProgress now={1} />

            <NewArtNavigation
                prevHref="/art/new/title#"
                nextHref="/art/new/tag#"
            />
        </div>
    )
}
export default NewArtDetailPage
