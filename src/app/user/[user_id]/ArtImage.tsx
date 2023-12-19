"use client"

import { Art } from "@/art/type"
import { Dialog, useDialog } from "@/components/Dialog"
import { SectionTitle } from "@/components/SectionTitle"
import { Flex } from "@mantine/core"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import styles from "./styles.module.css"
import LinkButton from "@/components/LinkButton"

interface ArtImageProps {
    art: Art
}
export const ArtImage: FC<ArtImageProps> = ({ art }) => {
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
                <div className={styles.taCenter}>
                    {art.title}
                </div>
            </Flex>

            <Dialog {...dialog.dialogProps}>
                <Link href={`/art/${art.artId}`} >
                    <Image
                        src={art.imageUrl}
                        alt={art.title}
                        width={200}
                        height={100}
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
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
