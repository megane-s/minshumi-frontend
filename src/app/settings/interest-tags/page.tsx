import { getSession } from "@/auth/server/auth"
import InterestTagsSettingForm from "./InterestTagsSettingForm"
import PleaseLogin from "@/app/art/[art_id]/appeal/PleaseLogin"
import { getInterestTags } from "@/art/tag/interest/get"
import { splitTags } from "@/art/tag/split"

const InterestTagsSettingPage = async () => {
    const session = await getSession()
    if (!session) {
        return <PleaseLogin />
    }
    const interestTags = await getInterestTags(session.user.id)
    return (
        <div>
            <InterestTagsSettingForm
                defaultValues={splitTags(interestTags)}
            />
        </div>
    )
}
export default InterestTagsSettingPage
