import LinkButton from "@/components/LinkButton"
import { Flex } from "@mantine/core"
import { notFound } from "next/navigation"
import { getUser } from "@/user/get";
import { getBusinessCardByUser } from "@/businessCard/getByUser";
import { getSession } from "@/auth/server/auth";
import { SectionTitle } from "@/components/SectionTitle";
import { PageTitle } from "@/components/PageTitle";
import Image from "next/image";
import { css } from "styled-system/css";
import { WatchingArtList } from "./WatchingArtList";
import { LikeArtList } from "./LikeArtList";
import { Comments } from "./Comments/Comments";
import { FC, Suspense } from "react";
import { Loader } from "@/components/Loader";
import { CenterLoader } from "@/components/CenterLoader";
import { FollowInfo } from "./FollowInfo";
import { UserId } from "@/user/type";
import { UserProfilePrimaryButton } from "./UserProfilePrimaryButton";
import { EditWatchingButton } from "./EditWatchingButton";
import { getMetadata } from "@/seo/getMetadata";

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
            <Image
                src={businessCard
                    ? `/api/businesscard/image?businesscard_id=${businessCard.businessCardId}`
                    : "/default_user_image.png"
                }
                alt="名刺"
                width={800}
                height={675 * 800 / 1200}
                style={{ width: "100%", height: "auto" }}
                priority
            />
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
            <Suspense fallback={<Loader />}>
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
            <Suspense fallback={<Loader />}>
                <WatchingArtList userId={userId} />
            </Suspense>

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
