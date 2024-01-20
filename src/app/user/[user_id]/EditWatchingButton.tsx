import { getSession } from "@/auth/server/auth"
import LinkButton from "@/components/LinkButton"
import { UserId } from "@/user/type"
import { FC } from "react"

interface EditWatchingButtonProps {
    userId: UserId
}
export const EditWatchingButton: FC<EditWatchingButtonProps> = async ({ userId }) => {
    const session = await getSession()
    const loginUser = session?.user
    if (!loginUser) return
    const isMe = userId === loginUser?.id
    if (!isMe) return
    return (
        <LinkButton href="/settings/watching-arts">
            編集
        </LinkButton>
    )
}
