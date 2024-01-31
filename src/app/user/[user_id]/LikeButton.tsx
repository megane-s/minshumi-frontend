"use client"

import { ActionIcon } from "@mantine/core";
import { FC } from "react";
import { FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
    isGooded: boolean;
    onClick: () => void;
    likeCount: number; // 追加: いいね数
}

export const LikeButton: FC<LikeButtonProps> = ({ isGooded, onClick, likeCount }) => {
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
            {likeCount > 0 && <span style={{ marginLeft: "4px" }}>{likeCount}</span>}
        </>
    );
};
