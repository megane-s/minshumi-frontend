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
import { Button } from "@/components/Button"
import { flex } from "styled-system/patterns"
import { Mutation, useMutate } from "@/util/client/useMutate"
import MutateButton from "@/components/MutateButton"
import { handleDeleteWatchingArt } from "../actions"

interface WatchingArtImageProps {
    art: Art
    editable?: boolean
}
export const WatchingArtImage: FC<WatchingArtImageProps> = ({ art, editable = false }) => {
    const dialog = useDialog()
    const deleteWatchingArt = useMutate(async () => {
        await handleDeleteWatchingArt(art.artId)
        dialog.onClose()
    }, {
        loading: { toast: "削除中" },
        onSuccess: { toast: `${art.title}を今見ている作品から削除しました` },
        onError: { toast: `削除できませんでした...` }
    })
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
                        _hover: { cursor: "pointer" },
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

                <SectionTitle className={css({ my: "md !important" })}>
                    <Flex w="100%" justify="space-between" align="center">
                        <div>
                            {art.title}
                        </div>
                        <LinkButton variant="light" size="xs" href={`/art/${art.artId}`}>
                            作品のページへ
                        </LinkButton>
                    </Flex>
                </SectionTitle>

                {editable &&
                    <Edit
                        deleteMutation={deleteWatchingArt}
                        artTitle={art.title}
                    />
                }
            </Dialog>
        </ >
    )
}


interface EditProps {
    deleteMutation: Mutation
    artTitle: string
}
const Edit: FC<EditProps> = ({ deleteMutation, artTitle }) => {
    const deleteConfirmDialog = useDialog()
    return (
        <div className={flex({ w: "full", flexDir: "column", align: "flex-end" })}>
            <Button variant="outline" color="error" onClick={deleteConfirmDialog.onOpen}>
                今見ている作品から削除
            </Button>

            <Dialog
                title={`「${artTitle}」を今見ている作品から削除してもいいですか？`}
                {...deleteConfirmDialog.dialogProps}
            >
                <div className={flex({ w: "full", justify: "flex-end", gap: "md" })}>
                    <Button onClick={deleteConfirmDialog.onClose}>
                        キャンセル
                    </Button>
                    <MutateButton mutation={deleteMutation} variant="filled" color="error">
                        削除
                    </MutateButton>
                </div>
            </Dialog>
        </div>
    )
}
