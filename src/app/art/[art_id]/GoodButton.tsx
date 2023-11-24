"use client"
import { ActionIcon, Affix } from "@mantine/core"
import { FC } from "react"
import { FaRegHeart } from "react-icons/fa";
import { handleGood } from "./actions";
import { ArtId } from "@/art/type";

interface GoodButtonProps {
    artId: ArtId
}
export const GoodButton: FC<GoodButtonProps> = ({ artId }) => {
    return (
        <Affix position={{ bottom: 8, right: 8 }}>
            <ActionIcon size="xl" variant="outline" bg="background.2" onClick={() => void handleGood(artId)}>
                <FaRegHeart />
            </ActionIcon>
        </Affix>
    )
}
