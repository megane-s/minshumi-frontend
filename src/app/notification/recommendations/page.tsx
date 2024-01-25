import PleaseLogin from "@/app/art/[art_id]/appeal/PleaseLogin"
import { getNotifications } from "@/notification/get"
import { getSession } from "next-auth/react"

interface PageProps {
}
const pagePage = async ({ }: PageProps) => {
    const session = await getSession()
    if (!session) return <PleaseLogin />
    const { recommends } = await getNotifications(session.user.id, {
        recommend: { limit: 100 },
        others: { limit: 0 },
    })
    return (
        <div>

        </div>
    )
}
export default pagePage