import { SectionTitle } from "@/components/SectionTitle"
import NewArtTagForm from "./Form"
import NewArtProgress from "../NewArtProgress"

const NewArtTagPage = () => {
    return (
        <div>
            <SectionTitle>
                作品のタグを選択
            </SectionTitle>
            <NewArtTagForm />

            <NewArtProgress now={1} />
        </div>
    )
}
export default NewArtTagPage
