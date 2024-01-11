import { Avatar } from "@/components/Avatar"
import { Session } from "next-auth"
import { FC } from "react"

interface HeaderAvatarProps {
  session: Session
}
export const HeaderAvatar: FC<HeaderAvatarProps> = ({ session }) => {
  return (
    <>
      <Avatar
        src={session.user.image}
        alt={session.user.name ?? "ユーザ"}
      />
    </>
  )
}
