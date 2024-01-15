"use client"

import { FC, useState } from "react"
import { handleCancelFollow, handleFollow } from "../actions"
import { UserId } from "@/user/type"
import { Button } from "@/components/Button"
import { useMutate } from "@/util/client/useMutate"

interface FollowButtonContentProps {
    userId: UserId
    defaultIsLoginUserFollow: boolean
}
export const FollowButtonContent: FC<FollowButtonContentProps> = ({ userId, defaultIsLoginUserFollow }) => {
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
        onSuccess: { toast: isLoginUserFollow ? "フォロー解除しました" : "フォローしました" },
        onError: { toast: "エラー" },
    }
    )

    return (
        <Button onClick={() => void handleClickFollow.mutate(null)}>
            {isLoginUserFollow ? "フォロー解除" : "フォロー"}
        </Button>
    )
}
