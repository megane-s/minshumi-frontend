"use client"

import { RecommendArt } from "@/art/type"
import { useDialog } from "@/components/Dialog"
import Image from "next/image"
import { FC } from "react"
import { ArtDetailDialog } from "./ArtDetailDialog"
import { css } from "styled-system/css"

interface LikeArtImageProps {
    art: RecommendArt
}
export const LikeArtImage: FC<LikeArtImageProps> = ({ art }) => {
    const dialog = useDialog()
    return (
        <>
            <div className={css({ width: "min-content", flexShrink: 0 })}>
                <Image
                    src={art.imageUrl}
                    alt={art.title}
                    width={200}
                    height={100}
                    className={css({
                        w: "fit-content",
                        minW: "fit-content",
                        maxW: "fit-content",
                        height: 100,
                    })}
                    onClick={() => dialog.onOpen()}
                />
                <div className={css({
                    w: "100%",
                    maxW: "100%",
                    wordBreak: "break-all",
                    textAlign: "center",
                })}>
                    {art.title}
                </div>
            </div>

            <ArtDetailDialog art={art} {...dialog.dialogProps} />


        </ >
    )
}
