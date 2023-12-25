"use client"

import { Art } from "@/art/type"
import { Dialog, useDialog } from "@/components/Dialog"
import { SectionTitle } from "@/components/SectionTitle"
import { Flex } from "@mantine/core"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import LinkButton from "@/components/LinkButton"
import { css } from "styled-system/css"

interface ArtImageProps {
    art: Art
}
export const ArtImage: FC<ArtImageProps> = ({ art }) => {
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

            <Dialog {...dialog.dialogProps}>
                <Link href={`/art/${art.artId}`} >
                    <Image
                        src={art.imageUrl}
                        alt={art.title}
                        width={200}
                        height={100}
                        className={css({ width: "100%", height: "auto", objectFit: "cover" })}
                    />
                </Link>

                <SectionTitle>
                    <Flex w="100%" justify="space-between" align="center">
                        <div>
                            {art.title}
                        </div>
                        <LinkButton variant="light" size="xs" href={`/art/${art.artId}`}>
                            作品のページへ
                        </LinkButton>
                    </Flex>
                </SectionTitle>
            </Dialog>
        </ >
    )
}
