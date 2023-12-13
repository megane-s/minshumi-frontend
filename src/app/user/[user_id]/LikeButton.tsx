//いいね、いいねキャンセルボタン
"use client"

import { ActionIcon } from "@mantine/core"
import { FC } from "react"
import styles from "./styles.module.css"
import { FaRegHeart } from "react-icons/fa"

interface LikeButtonProps {
    isGooded: boolean
    onClick: () => void
}
export const LikeButton: FC<LikeButtonProps> = ({ isGooded, onClick }) => {
    // const [isGooded, setIsGooded] = useState(propsIsGooded)
    // const commentGoodClick = async () => {
    //     if (!isGooded) {
    //         setIsGooded(true)
    //         await goodComment();
    //     } else {
    //         setIsGooded(false)
    //         await cancelGoodComment();
    //     }

    return (
        <>
            <ActionIcon
                variant={isGooded ? "filled" : "outline"}
                bg={isGooded ? "primary" : "background.2"}
                className={styles.actionIcon}
                onClick={() => onClick()}
                size={"lg"}
            >
                <FaRegHeart />

            </ActionIcon>
        </>
    )
}
