import PleaseLogin from "@/app/art/[art_id]/appeal/PleaseLogin"
import { getSession } from "@/auth/server/auth"
import AppealSettingForm from "./AppealSettingForm"
import { getArtAppealsByUser } from "@/art/appeal/getByUser"
import { Metadata } from "next"
import { getMetadata } from "@/seo/getMetadata"

export const metadata: Metadata = getMetadata({
    title: "アピール作品の編集 | みんしゅみ",
})

const AppealSettingPage = async () => {
    const session = await getSession()
    if (!session) {
        return <PleaseLogin />
    }
    const appeals = await getArtAppealsByUser(session.user.id)
    return (
        <div>
            <AppealSettingForm
                appeals={appeals}
            />
        </div>
    )
}
export default AppealSettingPage
