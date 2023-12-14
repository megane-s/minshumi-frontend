"use client"

import { FC, useState } from "react"
import { handleCancelFollow, handleFollow } from "./actions"
import { UserId } from "@/user/type"
import { Button } from "@/components/Button"

interface FollowButtonProps {
    userId: UserId
    defaultIsLoginUserFollow: boolean
}
export const FollowButton: FC<FollowButtonProps> = ({ userId, defaultIsLoginUserFollow }) => {
    const [isLoginUserFollow, setIsLoginUserFollow] = useState(defaultIsLoginUserFollow)
    const handleClickFollow = async () => {
        setIsLoginUserFollow(!isLoginUserFollow)
        try {
            if (isLoginUserFollow) {
                await handleCancelFollow(userId)
            } else {
                await handleFollow(userId)
            }
        } catch (error) {
            console.error(error)
            setIsLoginUserFollow(isLoginUserFollow)
        }
    }

    return (
        <Button onClick={() => void handleClickFollow()}>
            {isLoginUserFollow ? "フォロー解除" : "フォロー"}
        </Button>
    )
}
