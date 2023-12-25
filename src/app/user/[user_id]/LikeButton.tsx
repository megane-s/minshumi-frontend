"use client"

import { ActionIcon } from "@mantine/core"
import { FC } from "react"
import { FaRegHeart } from "react-icons/fa"

interface LikeButtonProps {
    isGooded: boolean
    onClick: () => void
}
export const LikeButton: FC<LikeButtonProps> = ({ isGooded, onClick }) => {
    return (
        <>
            <ActionIcon
                variant={isGooded ? "filled" : "outline"}
                bg={isGooded ? "primary" : "background.2"}
                onClick={() => onClick()}
                size={"lg"}
            >
                <FaRegHeart />
            </ActionIcon>
        </>
    )
}
