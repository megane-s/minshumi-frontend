// page.tsx
import React, { ReactNode } from "react";
import { Divider } from "@mantine/core";
import { getNotifications } from "@/notification/get";
import { Notification } from "@/notification/type"
import { getSession } from "@/auth/server/auth";
import PleaseLogin from "../art/[art_id]/appeal/PleaseLogin";
import { FaComment, FaRegStar } from "react-icons/fa";
import { GoodIcon } from "@/components/icon/Good";
import { RiUserFollowLine } from "react-icons/ri";
import { flex } from "styled-system/patterns";
import { SectionTitle } from "@/components/SectionTitle";

interface PageProps { }

const PagePage: React.FC<PageProps> = async () => {

    const session = await getSession()
    if (!session) return <PleaseLogin />
    const { recommends, others } = await getNotifications(session.user.id)

    return (
        <div>
            <h1>おすすめ</h1>
            <Divider />
            <div>
                {/* 通知一覧を表示 */}
                {recommends.map((notification) => (
                    <NotificationItem key={notification.notificationId} notification={notification} />
                ))}
                <LinkButton href="/notification/recommendations">
                    もっと見る
                </LinkButton>
            </div>
            <h1>その他</h1>
            <Divider />
            <div>
                {/* 通知一覧を表示 */}
                {others.map((notification) => (
                    <NotificationItem key={notification.notificationId} notification={notification} />
                ))}
            </div>
        </div>
    );
};

export default PagePage;



const notificationIcons: Record<string, ReactNode> = {
    "recommend": <FaRegStar />,
    "good": <GoodIcon />,
    "comment": <FaComment />,
    "follow": <RiUserFollowLine />,
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const notificationType = notification.type
    return (
        <div className={flex({ p: "md", gap: "sm", align: "center" })}>
            {notificationType in notificationIcons
                ? notificationIcons[notificationType]
                : <IoIosNotifications />
            }
            {notification.type === "recommend" &&
                <RecommendNotification notification={notification} />
            }
            {notification.type === "user-comment-good" &&
                <OthersCommentGoodNotification notification={notification} />
            }
            {notification.type === "comment" &&
                <OthersCommentNotification notification={notification} />
            }
            {notification.type === "follow" &&
                <OthersFollowNotification notification={notification} />
            }
        </div>
    )
}

import { FC } from "react"
import { getArt } from "@/art/get";
import { IoIosNotifications } from "react-icons/io";
import { getUser } from "@/user/get";
import { z } from "zod";
import { Link } from "@/components/Link";
import LinkButton from "@/components/LinkButton";

interface RecommendNotificationProps {
    notification: Notification
}
export const RecommendNotification: FC<RecommendNotificationProps> = async ({ notification }) => {
    const artId = notification.content
    const art = await getArt(artId)
    if (!art) return // レコメンドサーバ側のミスで存在しない作品がおすすめされた場合
    return (
        <div>
            <SectionTitle>
                おすすめ作品が届きました！
            </SectionTitle>
            <div>
                {art.title} がおすすめされました。
            </div>
        </div>
    )
}

interface OthersNotificationProps {
    notification: Notification
}
export const OthersFollowNotification: FC<OthersNotificationProps> = async ({ notification }) => {
    const userid = notification.content
    const user = await getUser(userid)
    if (!user) return // レコメンドサーバ側のミスで存在しない作品がおすすめされた場合
    return (
        <div>
            <SectionTitle>
                フォローされました！
            </SectionTitle>
            <div>
                {user.name} さんがあなたを
                <Link href={`/user/${userid}`}>
                    フォロー
                </Link>
                しました。
            </div>
        </div>
    )
}


const OthersCommentNotificationSchema = z.object({
    userId: z.string(),
    commentId: z.string(),
})
interface OthersNotificationProps {
    notification: Notification
}
export const OthersCommentNotification: FC<OthersNotificationProps> = async ({ notification }) => {
    const { content, userId: targetUserId } = notification;
    const { userId: commentUserId, commentId } = OthersCommentNotificationSchema.parse(JSON.parse(content))

    const user = await getUser(commentUserId)
    if (!user) return // レコメンドサーバ側のミスで存在しない作品がおすすめされた場合
    return (
        <div>
            <SectionTitle>
                コメントされました！
            </SectionTitle>
            <div>
                {user.name} さんから
                <Link href={`/user/${targetUserId}#comment-${commentId}`}>
                    コメント
                </Link>
                が届きました。
            </div>
        </div>
    )
}

const OthersCommentGoodNotificationSchema = z.object({
    userId: z.string(),
    commentId: z.string(),
})
interface OthersNotificationProps {
    notification: Notification
}
export const OthersCommentGoodNotification: FC<OthersNotificationProps> = async ({ notification }) => {
    const { content, userId: targetUserId } = notification;
    const { userId: commentgoodUserId, commentId } = OthersCommentGoodNotificationSchema.parse(JSON.parse(content))

    const user = await getUser(commentgoodUserId)
    if (!user) return // レコメンドサーバ側のミスで存在しない作品がおすすめされた場合
    return (
        <div>
            <SectionTitle>
                コメントにいいねされました！
            </SectionTitle>
            <div>
                {user.name} さんがあなたのコメントに
                <Link href={`/user/${targetUserId}#comment-${commentId}`}>
                    いいね
                </Link>
                しました。
            </div>
        </div>
    )
}
