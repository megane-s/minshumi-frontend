import LinkButton from "@/components/LinkButton"
import { Box, Divider, Flex } from "@mantine/core"
import { notFound } from "next/navigation"
import { LikeArtImage } from "./LikeArtImage";
import { getUser } from "@/user/get";
import { getWatchingArts } from "@/art/watching/get";
import { getBusinessCardByUser } from "@/businessCard/getByUser";
import { CommentForm } from "./CommentForm";
import { getCommentsByBusinessCard } from "@/businessCard/comment/getByBusinessCard";
import { getRecommendArtsByUser } from "@/art/recommend/getByUser";
import { ArtImage } from "./ArtImage";
import { CommentListItem } from "./CommentListItem";
import { getFollowers } from "@/user/follow/getFollowers";
import { getFollowings } from "@/user/follow/getFollowings";
import { getSession } from "@/auth/server/auth";
import styles from "./styles.module.css"
import { User } from "@/user/type";
import { isBusinessCardCommentGooded } from "@/businessCard/comment/good/isGooded";
import { SectionTitle } from "@/components/SectionTitle";
import { PageTitle } from "@/components/PageTitle";
import Image from "next/image";



interface PageProps {
    params: { user_id: string }
}
const UserProfilePage = async ({ params }: PageProps) => {
    const session = await getSession()
    const loginUser = session?.user
    const isLogin = !!loginUser
    const userId = params.user_id
    const user = await getUser(userId)
    const recommendArts = await getRecommendArtsByUser(userId)
    const WatchingArts = await getWatchingArts(userId)
    const businessCards = await getBusinessCardByUser(userId)
    const businessCard = businessCards[0]
    const comments = await getCommentsByBusinessCard(businessCard.businessCardId)
    const commentUsers = await Promise.all(
        comments.map(comment => getUser(comment.commentUserId))
    ) as User[]
    const commentIsGoodeds = await Promise.all(
        comments.map(comment =>
            loginUser
                ? isBusinessCardCommentGooded(comment.commentId, loginUser.id)
                : false
        )
    )
    // TODO 数だけ取得するmodelを用意すべき
    const followings = await getFollowings(userId)
    const followingsCount = followings.length
    const followers = await getFollowers(userId)
    const followersCount = followers.length

    if (!user) notFound()
    return (
        <div>
            {/* TODO 名刺を表示する */}
            <Image
                src="/placeholder/1200x675_red.png"
                alt="名刺手s津尾"
                width={800}
                height={675 * 800 / 1200}
                style={{ width: "100%", height: "auto" }}
            />
            <Flex justify="space-between" >
                <PageTitle>
                    {user.name}
                </PageTitle>
                <LinkButton href="/settings" >
                    編集する
                </LinkButton>
            </Flex>

            {/* フォロワ、フォロワー数を表示する */}
            <Flex w="100%" justify="flex-start">
                {followingsCount}
                フォロー
                <Box w="1em" />
                {followersCount}
                フォロワー
            </Flex>
            {/* ☆ 作品表示の部分をカルーセルを使う */}
            {/* 今見ている作品を表示する*/}
            <SectionTitle mt="md">
                今見ている作品
            </SectionTitle>
            <Flex gap="xs" my="xl" rowGap="100px" columnGap="sm" w="100%" className={styles.overflowAuto}>
                {WatchingArts.map(art =>
                    <ArtImage
                        key={art.artId}
                        art={art}
                    />
                )}
            </Flex>
            <SectionTitle mt="md">
                好きな作品
            </SectionTitle>
            {/* ☆ 作品表示の部分をカルーセルを使う */}
            {/* 好きな作品を表示する */}
            <Flex gap="xs" my="xl" rowGap="100px" columnGap="sm" w="100%" className={styles.overflowAuto}>
                {/* <Flex gap="xs" py="xl" rowGap="100px" columnGap="sm"  > */}
                {recommendArts.map(art =>
                    <LikeArtImage
                        key={art.artId}
                        art={art}
                    />
                )}
            </Flex>
            <Divider />

            {/* コメントの件数も出したい */}
            コメント {comments.length}件

            <CommentForm
                businessCardId={businessCard.businessCardId}
            />
            {/* コメントを送信すると、コメント欄を表示する */}
            {comments.map((comment, index) =>
                <CommentListItem
                    key={comment.commentId}
                    comment={comment}
                    commentUser={commentUsers[index]}
                    defaultIsGooded={commentIsGoodeds[index]}
                    isLogin={isLogin}
                    loginUser={loginUser ?? null}
                />
            )}
            {comments.length === 0 &&
                <Flex justify="center" align="center" p={50}>
                    コメントないぜ
                </Flex>
            }
        </div >
    )
}
export default UserProfilePage 