import { getMetadata } from "@/seo/getMetadata"
import { Metadata } from "next"
import AppealArtForm from "./AppealArt"

export const metadata: Metadata = getMetadata({
    title: "アピール作品の編集 | みんしゅみ",
})
const AppealSelectPage = () => {

    return <AppealArtForm />

}
export default AppealSelectPage