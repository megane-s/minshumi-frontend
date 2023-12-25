"use client"

import { RecommendArt } from "@/art/type"
import { useDialog } from "@/components/Dialog"
import { Flex } from "@mantine/core"
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
            <Flex direction="column" align="center" w="min-content">
                <Image
                    src={art.imageUrl}
                    alt={art.title}
                    width={200}
                    height={100}
                    style={{ width: "auto", height: 100, objectFit: "cover", cursor: "pointer" }}
                    onClick={() => dialog.onOpen()}
                />
                <div className={css({ textAlign: "center" })}>
                    {art.title}
                </div>
            </Flex>

            <ArtDetailDialog art={art} {...dialog.dialogProps} />


        </ >
    )
}
