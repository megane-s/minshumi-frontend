"use client"
import { ActionIcon, Affix } from "@mantine/core"
import { FC } from "react"
import { FaRegHeart } from "react-icons/fa";

interface GoodButtonProps {
}
export const GoodButton: FC<GoodButtonProps> = () => {
    return (
        <Affix position={{ bottom: 8, right: 8 }}>
            <ActionIcon size="xl" variant="outline" bg="background.2">
                <FaRegHeart />
            </ActionIcon>
        </Affix>
    )
}
