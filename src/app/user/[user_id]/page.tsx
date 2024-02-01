import LinkButton from "@/components/LinkButton"
import { Divider, Flex } from "@mantine/core"
import { notFound } from "next/navigation"
import { getUser } from "@/user/get";
import { getBusinessCardByUser } from "@/businessCard/getByUser";
import { getSession } from "@/auth/server/auth";
import { SectionTitle } from "@/components/SectionTitle";
import { PageTitle } from "@/components/PageTitle";
import { css } from "styled-system/css";
import { WatchingArtList } from "./WatchingArtList";
import { LikeArtList } from "./LikeArtList";
import { Comments } from "./Comments/Comments";
import { FC, Suspense } from "react";
import { CenterLoader } from "@/components/CenterLoader";
import { FollowInfo } from "./FollowInfo";
import { UserId } from "@/user/type";
import { UserProfilePrimaryButton } from "./UserProfilePrimaryButton";
import { EditWatchingButton } from "./EditWatchingButton";
import { getMetadata } from "@/seo/getMetadata";
import ProfileBusinessCard, { ProfileBusinessCardPlaceholder } from "./ProfileBusinessCard";
import { flex } from "styled-system/patterns";

export async function generateMetadata({ params: { user_id } }: { params: { user_id: string } }) {
    const user = await getUser(user_id)

    if (!user) notFound()

    return getMetadata({
        title: `${user.name ?? "無名のユーザ"} | みんしゅみ`,
        image: user.image ?? "https://storage.googleapis.com/minshumi-user-content/logo-square-1080x1080.png",
    })
}

interface PageProps {
    params: { user_id: string }
}
const UserProfilePage = async ({ params }: PageProps) => {
    const userId = params.user_id
    const user = await getUser(userId)
    if (!user) notFound()

    const [
        businessCards,
    ] = await Promise.all([
        getBusinessCardByUser(userId),
    ])
    const businessCard = businessCards.find(b => b.businessCardId === user.pinnedBusinessCardId)

    return (
        <div className={css({ mb: "xl" })}>
            <div className={flex({ justify: "center", align: "center", padding: ["8", "20"] })}>
                {businessCard
                    ?
                    <ProfileBusinessCard
                        businessCard={businessCard}
                    />
                    : <ProfileBusinessCardPlaceholder
                        user={user}
                    />
                }
            </div>

            <Flex
                justify="space-between"
                className={css({ mt: "lg", mb: "sm", flexDir: { base: "column", md: "row" }, gap: "sm" })}
            >
                <PageTitle>
                    {user.name}
                </PageTitle>
                <Suspense>
                    <UserProfilePrimaryButton userId={user.id} />
                </Suspense>
            </Flex>

            <Suspense>
                <FollowInfo userId={user.id} />
            </Suspense>

            <Flex w="100%" justify="space-between" className={css({ mt: "lg", mb: "sm" })}>
                <SectionTitle >
                    アピール
                </SectionTitle>
                <Suspense>
                    <EditAppealButton
                        userId={userId}
                    />
                </Suspense>
            </Flex>
            <Suspense fallback={<CenterLoader />}>
                <LikeArtList userId={userId} />
            </Suspense>

            <Flex w="100%" justify="space-between" className={css({ mt: "lg", mb: "sm" })}>
                <SectionTitle >
                    今見ている作品
                </SectionTitle>
                <Suspense>
                    <EditWatchingButton
                        userId={userId}
                    />
                </Suspense>
            </Flex>
            <Suspense fallback={<CenterLoader />}>
                <WatchingArtList userId={userId} />
            </Suspense>

            <Divider my="lg" />

            <Suspense fallback={<CenterLoader />}>
                <Comments
                    userId={userId}
                />
            </Suspense>

        </div >
    )
}
export default UserProfilePage

interface EditAppealButtonProps {
    userId: UserId
}
const EditAppealButton: FC<EditAppealButtonProps> = async ({ userId }) => {
    const session = await getSession()
    const loginUser = session?.user
    return (
        <>
            {loginUser && (userId === loginUser?.id
                ? <LinkButton href="/settings/appeals">
                    アピールの管理
                </LinkButton>
                : null
            )}
        </>
    )
}
