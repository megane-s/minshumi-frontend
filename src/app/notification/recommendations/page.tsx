import PleaseLogin from "@/app/art/[art_id]/appeal/PleaseLogin"
import { getNotifications } from "@/notification/get"
import { NotificationItem } from "../NotificationItem"
import { getSession } from "@/auth/server/auth"

const RecommendationNotificationPage = async () => {
    const session = await getSession()
    if (!session) return <PleaseLogin />
    const { recommends } = await getNotifications(session.user.id, {
        recommend: { limit: 100 },
        others: { limit: 0 },
    })
    return (
        <div>
            {recommends.map(recommend =>
                <NotificationItem
                    key={recommend.notificationId}
                    notification={recommend}
                />
            )}
        </div>
    )
}
export default RecommendationNotificationPage
