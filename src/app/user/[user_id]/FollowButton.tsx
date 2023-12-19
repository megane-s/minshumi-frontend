"use client"

import { FC, useState } from "react"
import { handleCancelFollow, handleFollow } from "./actions"
import { UserId } from "@/user/type"
import { Button } from "@/components/Button"
import { useMutate } from "@/util/client/useMutate"

interface FollowButtonProps {
    userId: UserId
    defaultIsLoginUserFollow: boolean
}
export const FollowButton: FC<FollowButtonProps> = ({ userId, defaultIsLoginUserFollow }) => {
    const [isLoginUserFollow, setIsLoginUserFollow] = useState(defaultIsLoginUserFollow)
    const handleClickFollow = useMutate(async () => {
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

    }, {
        onSuccess: { toast: "フォローを押しました" },
        onError: { toast: "フォローを押せませんでした" },
    }
    )

    return (
        <Button onClick={() => void handleClickFollow.mutate(null)}>
            {isLoginUserFollow ? "フォロー解除" : "フォロー"}
        </Button>
    )
}
