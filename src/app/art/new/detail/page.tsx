import { SectionTitle } from "@/components/SectionTitle"
import NewArtDetailForm from "./Form"
import NewArtProgress from "../NewArtProgress"

const NewArtDetailPage = () => {
    return (
        <div>
            <SectionTitle>
                作品の詳細を入力
            </SectionTitle>

            <NewArtDetailForm />

            <NewArtProgress now={0} />
        </div>
    )
}
export default NewArtDetailPage
