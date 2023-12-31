import { getSession } from "@/auth/server/auth"
import { getBusinessCardById } from "@/businessCard/getById"
import { BusinessCardId } from "@/businessCard/type"
import { getUser } from "@/user/get"
import { notImplementError } from "@/util/notImplement"
import { notFound } from "next/navigation"
import { BusinessCardEditor } from "./BusinessCardEditor"
import "./style.css"
import { getRecommendArtsByUser } from "@/art/recommend/getByUser"
import { getBusinessCardInterestTags } from "@/businessCard/getInterestTags"
import { getBusinessCardLikeArts } from "@/businessCard/getLikeArts"

interface PageProps {
    params: { businesscard_id: string }
}
const EditBusinessCardPage = async ({ params: { businesscard_id } }: PageProps) => {

    const [businessCard, currentUser] = await Promise.all([
        getBusinessCardData(businesscard_id),
        getCurrentUserData(),
    ])

    if (!businessCard) notFound()
    if (businessCard.user?.id && currentUser.user?.id !== businessCard.user?.id) throw notImplementError(`名刺は作成者以外は編集できません`)

    return (
        <BusinessCardEditor
            user={businessCard.user}
            ranks={currentUser.ranks}
            tags={currentUser.tags ?? []}
            likeArts={Array(3).fill("").map((_, i) => currentUser.likeArts?.[i]?.title ?? "")}
            defaultValues={{
                ...businessCard.businessCard,
                tags: businessCard.tags ?? currentUser.tags ?? [],
                arts: businessCard.arts ?? currentUser.likeArts ?? [],
            }}
            businessCardId={businessCard.businessCard.businessCardId}
        />
    )
}
export default EditBusinessCardPage

const getBusinessCardData = async (businessCardId: BusinessCardId) => {
    const businessCard = await getBusinessCardById(businessCardId)
    if (!businessCard) return null
    const user = await getUser(businessCard.userId)
    const tags = await getBusinessCardInterestTags(businessCardId)
    const arts = await getBusinessCardLikeArts(businessCardId)
    return { businessCard, user, tags, arts } as const
}

const getCurrentUserData = async () => {
    const session = await getSession()
    if (!session) return { currentUser: null, ranks: null, tags: null } as const
    const user = session.user
    const ranks = ["アクションマスター", "SFマスター", "初心者"] // TODO getRanks(user.id)
    const tags = ["アクション", "SF", "ジャンプ"] // TODO getTags(user.id)
    const likeArts = await getRecommendArtsByUser(user.id)
    return { user, ranks, tags, likeArts } as const
}
