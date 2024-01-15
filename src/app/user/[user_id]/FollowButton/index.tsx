import { FC } from "react"
import { FollowButtonContent } from "./Content"
import { getFollowers } from "@/user/follow/getFollowers"
import { UserId } from "@/user/type"
import { User } from "next-auth"

interface FollowButtonProps {
  userId: UserId
  loginUser: User
}
export const FollowButton: FC<FollowButtonProps> = async ({ userId, loginUser }) => {
  // TODO フォローしているかどうかを判定する関数を用意する
  const isLoginUserFollow = await getFollowers(userId)
    .then(followers => followers.some(userFollower => userFollower.id === loginUser?.id))

  return (
    <FollowButtonContent
      userId={userId}
      defaultIsLoginUserFollow={isLoginUserFollow}
    />
  )
}
