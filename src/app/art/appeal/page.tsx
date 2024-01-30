import { getMetadata } from "@/seo/getMetadata"
import { Metadata } from "next"
import AppealArtForm from "./AppealArt"

export const metadata: Metadata = getMetadata({
    title: "作品をアピールする | みんしゅみ",
})
const AppealSelectPage = () => {

    return <AppealArtForm />

}
export default AppealSelectPage