import { BusinessCard } from "@/businessCard/type"
import Image from "next/image"
import { FC } from "react"

interface ProfileBusinessCardProps {
    businessCard: BusinessCard
}
const ProfileBusinessCard: FC<ProfileBusinessCardProps> = ({ businessCard }) => {
    return (
        <Image
            src={`/api/businesscard/image?businesscard_id=${businessCard.businessCardId}`}
            alt="名刺"
            width={800}
            height={675 * 800 / 1200}
            style={{ width: "100%", height: "auto" }}
            priority
        />
    )
}

export default ProfileBusinessCard

interface ProfileBusinessCardPlaceholderProps {
}
export const ProfileBusinessCardPlaceholder: FC<ProfileBusinessCardPlaceholderProps> = () => {
    return (
        <div>
            このユーザはまだ名刺が設定されていません...
        </div>
    )
}

