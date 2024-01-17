import { getFollowers } from "@/user/follow/getFollowers"
import { getFollowings } from "@/user/follow/getFollowings"
import { UserId } from "@/user/type"
import { FC } from "react"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"

interface FollowInfoProps {
  userId: UserId
}
export const FollowInfo: FC<FollowInfoProps> = async ({ userId }) => {
  const [
    userFollowings,
    userFollowers,
  ] = await Promise.all([
    getFollowings(userId),
    getFollowers(userId),
  ])
  const userFollowingsCount = userFollowings.length
  const userFollowersCount = userFollowers.length
  return (
    <div className={flex({ w: "full", justify: "flex-start" })}>
      {userFollowingsCount}
      フォロー
      <div className={css({ w: "1em" })} />
      {userFollowersCount}
      フォロワー
    </div>
  )
}
