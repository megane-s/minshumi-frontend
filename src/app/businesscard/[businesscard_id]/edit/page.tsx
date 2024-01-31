import { getSession } from "@/auth/server/auth"
import { getBusinessCardById } from "@/businessCard/getById"
import { BusinessCardId } from "@/businessCard/type"
import { getUser } from "@/user/get"
import { notImplementError } from "@/util/notImplement"
import { notFound } from "next/navigation"
import { BusinessCardEditor } from "./BusinessCardEditor"
import "./style.css"
import { getArtAppealsByUser } from "@/art/appeal/getByUser"
import { getBusinessCardInterestTags } from "@/businessCard/getInterestTags"
import { getBusinessCardLikeArts } from "@/businessCard/getLikeArts"
import { getMetadata } from "@/seo/getMetadata"
import { getDefaultBusinessCard } from "@/businessCard/defaults"
import { getInterestTags } from "@/art/tag/interest/get"

export async function generateMetadata({ params: { businesscard_id } }: { params: { businesscard_id: string } }) {
    if (businesscard_id === "instant") {
        return getMetadata()
    }
    const businesscard = await getBusinessCardById(businesscard_id)
    if (!businesscard) notFound()
    return getMetadata({
        title: `${businesscard.name}の名刺 | みんしゅみ`,
        image: businesscard.imageUrl,
    })
}

const defaultInstantBusinesscardTags = ["アクション", "SF"]
const defaultInstantBusinesscardArts = ["作品1", "作品2", "作品3"]

interface PageProps {
    params: { businesscard_id: string }
}
const EditBusinessCardPage = async ({ params: { businesscard_id } }: PageProps) => {
    const isInstant = businesscard_id === "instant"

    const [businessCard, currentUser] = await Promise.all([
        isInstant
            ? {
                businessCard: {
                    ...getDefaultBusinessCard(),
                    tags: defaultInstantBusinesscardTags,
                    arts: defaultInstantBusinesscardArts,
                },
                user: null,
            }
            : getBusinessCardData(isInstant, businesscard_id),
        getCurrentUserData(),
    ])

    if (!businessCard) notFound()
    if (businessCard.user?.id && currentUser.user?.id !== businessCard.user?.id) throw notImplementError(`名刺は作成者以外は編集できません`)

    return (
        <BusinessCardEditor
            user={businessCard.user}
            ranks={currentUser.ranks}
            tags={currentUser.tags ?? defaultInstantBusinesscardTags}
            likeArts={Array(3).fill("").map((_, i) => currentUser.likeArts?.[i]?.title ?? "")}
            defaultValues={{
                ...businessCard.businessCard,
                tags: defaultInstantBusinesscardTags,
                arts: defaultInstantBusinesscardArts,
            }}
            businessCardId={
                (businessCard.businessCard && "businessCardId" in businessCard.businessCard)
                    ? businessCard.businessCard["businessCardId"]
                    : null
            }
        />
    )
}
export default EditBusinessCardPage

const getBusinessCardData = async (isInstant: boolean, businessCardId: BusinessCardId) => {
    if (isInstant) {
        return {
            businessCard: null,
            tags: [],
            arts: [],
            user: await getSession().then(session => session?.user ?? null),
        }
    }
    const businessCard = await getBusinessCardById(businessCardId)
    if (!businessCard) return null
    const [user, tags, arts] = await Promise.all([
        getUser(businessCard.userId),
        getBusinessCardInterestTags(businessCardId),
        getBusinessCardLikeArts(businessCardId),
    ])
    return { businessCard, user, tags, arts } as const
}

const getCurrentUserData = async () => {
    const session = await getSession()
    if (!session) return { currentUser: null, ranks: null, tags: null } as const
    const user = session.user
    const tags = await getInterestTags(user.id)
    if (tags.length === 0) {
        tags.push("アニメ", "映画", "マンガ", "アーティスト")
    }
    const ranks = ["初心者", "みんしゅみユーザ", ...tags.map(tag => `${tag}好き`)] // TODO getRanks(user.id)
    const likeArts = await getArtAppealsByUser(user.id)
    return { user, ranks, tags, likeArts } as const
}
