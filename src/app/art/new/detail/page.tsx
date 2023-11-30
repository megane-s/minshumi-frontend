import { getNewArtSession } from "@/art/newArtSession/cookies"
import NewArtNavigation from "../Navigation"
import NewArtProgress from "../NewArtProgress"
import NewArtSectionTitle from "../NewArtSectionTitle"
import InputDetailForm from "./InputDetailForm"

const NewArtDetailPage = async () => {
    const newArtSession = await getNewArtSession()
    return (
        <div>
            <NewArtSectionTitle>
                2. 作品の詳細を入力
            </NewArtSectionTitle>

            <InputDetailForm
                defaultValues={{
                    title: newArtSession?.title ?? "",
                    description: newArtSession?.description ?? "",
                    likePoint: newArtSession?.likePoint ?? "",
                    imageUrl: newArtSession?.imageUrl ?? "/placeholder/300x200_red.png",
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
