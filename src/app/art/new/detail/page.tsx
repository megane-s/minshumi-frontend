import NewArtNavigation from "../Navigation"
import NewArtProgress from "../NewArtProgress"
import InputDetailForm from "./InputDetailForm"

interface PageProps {
    params: {
        title?: string
    }
}
const NewArtDetailPage = ({ params }: PageProps) => {
    return (
        <div>
            <InputDetailForm
                defaultValues={{
                    title: params.title ?? "",
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
