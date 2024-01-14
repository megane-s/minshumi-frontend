import { getSession } from "@/auth/server/auth"
import UserSettingForm from "./UserSettingForm"
import PleaseLogin from "@/app/art/[art_id]/appeal/PleaseLogin"
import { getBusinessCardByUser } from "@/businessCard/getByUser"

const UserSettingPage = async () => {
    const session = await getSession()
    if (!session) {
        return <PleaseLogin />
    }
    const businessCards = await getBusinessCardByUser(session.user.id)
    return (
        <div>
            <UserSettingForm
                user={session.user}
                businessCards={businessCards}
            />
        </div>
    )
}
export default UserSettingPage
