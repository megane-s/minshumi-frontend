// page.tsx
import React from "react";
import { Divider } from "@mantine/core";
import { getNotifications } from "@/notification/get";
import { getSession } from "@/auth/server/auth";
import PleaseLogin from "../art/[art_id]/appeal/PleaseLogin";
import { SectionTitle } from "@/components/SectionTitle";
import LinkButton from "@/components/LinkButton";
import { css } from "styled-system/css";
import { NotificationItem } from "./NotificationItem";


interface PageProps { }

const NotificationPage: React.FC<PageProps> = async () => {

    const session = await getSession()
    if (!session) return <PleaseLogin />
    const { recommends, others } = await getNotifications(session.user.id, {
        markAsRead: true,
    })

    return (
        <div>
            <SectionTitle className={css({ mt: "8 !important", mb: "2 !important" })}>おすすめ</SectionTitle>
            <Divider />
            <div>
                {/* 通知一覧を表示 */}
                {recommends.map((notification) => (
                    <NotificationItem key={notification.notificationId} notification={notification} />
                ))}
                {recommends.length >= 5 &&
                    <LinkButton href="/notification/recommendations">
                        もっと見る
                    </LinkButton>
                }
                {recommends.length === 0 &&
                    <div className={css({ my: 4 })}>
                        おすすめの通知はありません
                    </div>
                }
            </div>

            <SectionTitle className={css({ mt: "8 !important", mb: "2 !important" })}>その他</SectionTitle>
            <Divider />
            <div>
                {/* 通知一覧を表示 */}
                {others.map((notification) => (
                    <NotificationItem key={notification.notificationId} notification={notification} />
                ))}
                {recommends.length === 0 &&
                    <div className={css({ my: 4 })}>
                        通知はありません
                    </div>
                }
            </div>
        </div>
    );
};

export default NotificationPage;


