import { getBusinessCardById } from "@/businessCard/getById"
import { BusinessCardPreview } from "../edit/BusinessCardPreview"
import { notFound } from "next/navigation"
import { getBusinessCardInterestTags } from "@/businessCard/getInterestTags"
import { getBusinessCardLikeArts } from "@/businessCard/getLikeArts"
import { flex } from "styled-system/patterns"
import { BusinessCardPublishForm } from "./PublishForm"
import { css } from "styled-system/css"
import { ActionIcon } from "@/components/ActionIcon"
import { ArrowLeftIcon } from "@/components/icon/ArrowLeft"
import { BackButton } from "@/components/BackLink"

interface PageProps {
    params: { businesscard_id: string }
}
const BusinessCardSettingsPage = async ({ params: { businesscard_id } }: PageProps) => {
    const [businessCard, interestTags, likeArts] = await Promise.all([
        await getBusinessCardById(businesscard_id),
        await getBusinessCardInterestTags(businesscard_id),
        await getBusinessCardLikeArts(businesscard_id),
    ])
    if (!businessCard) return notFound()
    return (
        <div className={flex({ flexDir: "column", alignItems: "center", gap: "md", my: "md", w: "full", py: "md" })}>
            <div className={flex({ justify: "flex-start", w: "full" })}>
                <ActionIcon
                    component={BackButton}
                    variant="subtle"
                >
                    <ArrowLeftIcon />
                </ActionIcon>
            </div>
            <BusinessCardPreview
                name={businessCard.name}
                icon={businessCard.imageUrl}
                rank={businessCard.rank}
                interestTags={interestTags}
                arts={likeArts}
                backgroundImage={businessCard.backgroundImageUrl}
                themeColor={businessCard.themeColor}
            />
            <BusinessCardPublishForm
                businessCardId={businessCard.businessCardId}
                className={css({ mt: "xl" })}
                defaultValues={{
                    isPublish: businessCard.isPublish,
                    canComment: businessCard.canComment,
                }}
            />
        </div>
    )
}
export default BusinessCardSettingsPage
