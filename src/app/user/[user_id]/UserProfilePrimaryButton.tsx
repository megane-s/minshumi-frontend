import { getSession } from "@/auth/server/auth"
import LinkButton from "@/components/LinkButton"
import { Loader } from "@/components/Loader"
import { UserId } from "@/user/type"
import { FC, Suspense } from "react"
import { FollowButton } from "./FollowButton"

interface UserProfilePrimaryButtonProps {
    userId: UserId
}
export const UserProfilePrimaryButton: FC<UserProfilePrimaryButtonProps> = async ({ userId }) => {
    const session = await getSession()
    const loginUser = session?.user
    if (!loginUser) return
    const isMe = userId === loginUser?.id
    return (
        isMe
            ? <LinkButton href="/settings/user">
                編集する
            </LinkButton>
            : <Suspense fallback={<Loader />}>
                <FollowButton
                    userId={userId}
                    loginUser={loginUser}
                />
            </Suspense>
    )
}
