import { getSession } from "@/auth/server/auth"
import { BusinessCard } from "@/businessCard/type"
import { Alert } from "@/components/Alert"
import { Link } from "@/components/Link"
import { AlertIcon } from "@/components/icon/AlertIcon"
import { User } from "@/user/type"
import Image from "next/image"
import { FC } from "react"
import { css } from "styled-system/css"

interface ProfileBusinessCardProps {
    businessCard: BusinessCard
}
const ProfileBusinessCard: FC<ProfileBusinessCardProps> = ({ businessCard }) => {
    return (
        <div
            className={
                css({
                    position: "relative",
                    w: "min(600px, 100%)",
                    aspectRatio: "1200 / 675",
                    borderRadius: "xl",
                    overflow: "hidden",
                    base: {
                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)",
                    },
                    md: {
                        borderTop: "solid rgba(255, 255, 255, 0.02)",
                        borderLeft: "solid rgba(255, 255, 255, 0.02)",
                        boxShadow: "20px 20px 30px rgba(0, 0, 0, 0.25)",
                    },
                    transform: "scale(1.0)",
                    transition: "all 0.3s",
                })}
        >
            <Image
                src={`/api/businesscard/image?businesscard_id=${businessCard.businessCardId}`}
                alt="名刺"
                width={800}
                height={675 * 800 / 1200}
                style={{ width: "100%", height: "auto" }}
                priority
            />
        </div>
    )
}

export default ProfileBusinessCard

interface ProfileBusinessCardPlaceholderProps {
    user: User
}
export const ProfileBusinessCardPlaceholder: FC<ProfileBusinessCardPlaceholderProps> = async ({ user }) => {
    const session = await getSession()
    const isOwn = session && session.user.id === user.id
    return (
        isOwn
            ? <Alert color="error" title="名刺が設定されていません！" icon={<AlertIcon />}>
                <Link href="/settings/user">
                    設定画面
                </Link>
                から名刺を作成・選択することでプロフィール画面に表示できます。
            </Alert>
            : <Alert color="info" title="このユーザは名刺を設定していません"></Alert>
    )
}

