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
            {notification.type === "good" &&
                <div>いいね:{notification.content}</div>
            }
            {notification.type === "comment" &&
                <div>コメント:{notification.content}</div>
            }
            {notification.type === "follow" &&
                <div>フォロー:{notification.content}</div>
            }
        </div>
    )
}

import { FC } from "react"
import { getArt } from "@/art/get";
import { IoIosNotifications } from "react-icons/io";

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


const PagePage: React.FC<PageProps> = async () => {

    const session = await getSession()
    if (!session) return <PleaseLogin />
    const notifications = await getNotifications(session.user.id)
    const { recommends, others } = splitNotifications(notifications)

    return (
        <div>
            <h1>おすすめ</h1>
            <Divider />
            <div>
                {/* 通知一覧を表示 */}
                {recommends.map((notification) => (
                    <NotificationItem key={notification.notificationId} notification={notification} />
                ))}
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


const splitNotifications = (notifications: Notification[]) => {
    const recommends: Notification[] = [];
    const others: Notification[] = [];

    notifications.forEach((notification) => {
        switch (notification.type) {
            case "recommend":
                recommends.push(notification);
                break;
            default:
                others.push(notification);
                break;
        }
    });

    return {
        recommends,
        others,
    };
};