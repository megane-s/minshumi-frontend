import { getArt } from "@/art/get"
import DateView from "@/components/DateView"
import { Link } from "@/components/Link"
import { SectionTitle } from "@/components/SectionTitle"
import { GoodIcon } from "@/components/icon/Good"
import { Notification } from "@/notification/type"
import { getUser } from "@/user/get"
import { ReactNode, FC } from "react"
import { FaRegStar, FaComment } from "react-icons/fa"
import { IoIosNotifications } from "react-icons/io"
import { RiUserFollowLine } from "react-icons/ri"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"
import { z } from "zod"

const notificationIcons: Record<string, ReactNode> = {
    "recommend": <FaRegStar />,
    "good": <GoodIcon />,
    "comment": <FaComment />,
    "follow": <RiUserFollowLine />,
}

export const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
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
                <span className={css({ ml: "2", color: "gray.600", fontWeight: "normal", fontSize: "md" })}>
                    <DateView
                        variant="before"
                        date={notification.createAt}
                    />
                </span>
            </SectionTitle>
            <div>
                <Link href={`/art/${art.artId}`}>
                    {art.title}
                </Link>
                がおすすめされました。
            </div>
        </div>
    )
}

interface OthersNotificationProps {
    notification: Notification
}
export const OthersFollowNotification: FC<OthersNotificationProps> = async ({ notification }) => {
    const userId = notification.content
    const user = await getUser(userId)
    if (!user) return // レコメンドサーバ側のミスで存在しない作品がおすすめされた場合
    return (
        <div>
            <SectionTitle>
                フォローされました！
            </SectionTitle>
            <div>
                {user.name} さんがあなたを
                <Link href={`/user/${userId}`}>
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
