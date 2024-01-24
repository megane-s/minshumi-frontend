import { Metadata } from "next"
import NewWatchingArtForm from "./NewWatchingArtForm"
import { getMetadata } from "@/seo/getMetadata"

export const metadata: Metadata = getMetadata({
    title: "今見ている作品の編集 | みんしゅみ",
})

const NewWatchingArtPage = () => {
    return <NewWatchingArtForm />
}
export default NewWatchingArtPage
