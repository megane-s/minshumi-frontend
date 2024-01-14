import PleaseLogin from "@/app/art/[art_id]/appeal/PleaseLogin"
import { getSession } from "@/auth/server/auth"
import WatchingArtsSettingForm from "./WatchingArtsSettingForm"
import { getWatchingArts } from "@/art/watching/get"

const WatchingArtsSettingPage = async () => {
    const session = await getSession()
    if (!session) {
        return <PleaseLogin />
    }
    const watchingArts = await getWatchingArts(session.user.id)
    return (
        <div>
            <WatchingArtsSettingForm
                watchingArts={watchingArts}
            />
        </div>
    )
}
export default WatchingArtsSettingPage
