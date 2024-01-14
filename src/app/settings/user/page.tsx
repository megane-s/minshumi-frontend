import { getSession } from "@/auth/server/auth"
import UserSettingForm from "./UserSettingForm"
import PleaseLogin from "@/app/art/[art_id]/appeal/PleaseLogin"
import { getBusinessCardByUser } from "@/businessCard/getByUser"
import { getUser } from "@/user/get"

const UserSettingPage = async () => {
    const user = await getSession()
        .then(session => session && getUser(session?.user.id))
    if (!user) {
        return <PleaseLogin />
    }
    const businessCards = await getBusinessCardByUser(user.id)
    return (
        <div>
            <UserSettingForm
                user={user}
                businessCards={businessCards}
                defaultPinnedBusinessCardId={user.pinnedBusinessCardId}
            />
        </div>
    )
}
export default UserSettingPage
