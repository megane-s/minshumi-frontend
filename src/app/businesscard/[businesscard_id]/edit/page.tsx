import { getBusinessCardById } from "@/businessCard/getById"
import { notFound } from "next/navigation"
import { BusinessCardEditor } from "./BusinessCardEditor"
import "./style.css"
import { getMetadata } from "@/seo/getMetadata"
import { ComponentProps } from "react"
import { User } from "next-auth"
import { medias } from "@/art/components/tag/tags"
import { getDefaultBusinessCard } from "@/businessCard/defaults"
import { getSession } from "@/auth/server/auth"
import { getInterestTags } from "@/art/tag/interest/get"
import { getBusinessCardInterestTags } from "@/businessCard/getInterestTags"
import { BusinessCardId } from "@/businessCard/type"
import { getBusinessCardLikeArts } from "@/businessCard/getLikeArts"

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

interface PageProps {
    params: { businesscard_id: string }
}
const EditBusinessCardPage = async ({ params: { businesscard_id } }: PageProps) => {
    const isInstant = businesscard_id === "instant"

    const { businessCard, user, ranks, tags } = await getBusinessCardDefaultValues(isInstant, businesscard_id)

    if (!businessCard) notFound()

    console.log(businessCard);


    return (
        <BusinessCardEditor
            user={user}
            ranks={ranks}
            tags={tags}
            defaultValues={businessCard}
            businessCardId={businessCard.businessCardId ?? null}
        />
    )
}
export default EditBusinessCardPage

const getBusinessCardDefaultValues = async (isInstant: boolean, businessCardId: BusinessCardId): Promise<{
    businessCard: ComponentProps<typeof BusinessCardEditor>["defaultValues"]
    user: User | null
    ranks: ComponentProps<typeof BusinessCardEditor>["ranks"]
    tags: ComponentProps<typeof BusinessCardEditor>["tags"]
}> => {
    const defaultResult = {
        businessCard: {
            ...getDefaultBusinessCard(),
            arts: ["作品1", "作品2", "作品3"],
            tags: ["アニメ"],
        },
        user: null,
        ranks: [],
        tags: defaultTags,
    }

    if (isInstant) {
        return defaultResult
    }

    const session = await getSession()
    if (!session) {
        return defaultResult
    }

    const businessCard = await getBusinessCardById(businessCardId)
    if (!businessCard) {
        return {
            ...defaultResult,
            user: session.user,
        }
    }

    const [tags, arts] = await Promise.all([
        getBusinessCardInterestTags(businessCard.businessCardId)
            .then(async businessCardTags => {
                if (businessCardTags.length >= 3) return [...businessCardTags].slice(0, 3)
                const userTags = await getInterestTags(session.user.id)
                if (userTags.length >= 3) return [...userTags].slice(0, 3)
                return [...businessCardTags, ...userTags]
            })
            .then(tags => Array.from(new Set(tags))),
        getBusinessCardLikeArts(businessCardId),
    ])
    const ranks = ["みんしゅみユーザ", "みんしゅみ初心者", ...tags.map(tag => `${tag}好き`)]

    return {
        businessCard: {
            ...businessCard,
            tags,
            arts,
        },
        user: session.user,
        ranks,
        tags,
    }
}

const defaultTags = medias
