"use client"

import FullWidth from "@/app/BaseLayout/FullWidth"
import CenterizedScroll, { CenterizedScrollTarget } from "@/components/CenterizedScroll"
import { ActionIcon } from "@/components/ActionIcon"
import { Textarea } from "@/components/Textarea"
import { Center, Stack, Text } from "@mantine/core"
import { FC, ReactNode, useState } from "react"
import { useDialog } from "@/components/Dialog"
import { IoMdAdd } from "react-icons/io"
import RelatedArtListItem from "./RelatedArtListItem"
import Image from "next/image"
import EditArtDialog from "./EditArtDialog/EditArtDialog"
import { css } from "styled-system/css"
import { InputRelatedArt } from "@/art/type"

interface ArtRelatedFormProps {
    title: string
    imageUrl: string

    likePoint: string
    onChangeLikePoint: (likePoint: string) => void

    prevArts: InputRelatedArt[]
    onAddPrevArt: (input: InputRelatedArt) => void
    onUpdatePrevArt: (index: number, input: InputRelatedArt) => void
    onDeletePrevArt: (index: number) => void

    nextArts: InputRelatedArt[]
    onAddNextArt: (input: InputRelatedArt) => void
    onUpdateNextArt: (index: number, input: InputRelatedArt) => void
    onDeleteNextArt: (index: number) => void

    actions: ReactNode
}
export const ArtRelatedForm: FC<ArtRelatedFormProps> = ({
    title,
    imageUrl,
    likePoint, onChangeLikePoint,
    prevArts, onAddPrevArt, onUpdatePrevArt, onDeletePrevArt,
    nextArts, onAddNextArt, onUpdateNextArt, onDeleteNextArt,
    actions,
}) => {
    const [addTarget, setAddTarget] = useState<null | "prev" | "next">(null)
    const addArtDialog = useDialog()
    const handleAddArt = (input: InputRelatedArt) => {
        if (addTarget === null) return
        if (addTarget === "prev") onAddPrevArt(input)
        if (addTarget === "next") onAddNextArt(input)
    }
    return (
        <div>
            <Text ta="center">好きなポイント</Text>
            <Center my="md" w="100%">
                <Textarea
                    value={likePoint}
                    onChange={e => onChangeLikePoint(e.target.value)}
                    w="500px"
                    maw="100%"
                    mb="xl"
                    rows={4}
                />
            </Center>

            <Text ta="center">前後に見た作品</Text>
            <FullWidth>
                <Center>
                    <CenterizedScroll className={css({ transition: "opacity 0.3s", paddingX: "var(--mantine-spacing-lg)" })}>
                        <ActionIcon
                            onClick={() => {
                                setAddTarget("prev")
                                addArtDialog.onOpen()
                            }}
                        >
                            <IoMdAdd />
                        </ActionIcon>
                        {prevArts.map((art, index) =>
                            <RelatedArtListItem
                                key={"artId" in art ? art.artId : art.title}
                                className={css({ flexShrink: 0 })}
                                artInput={art}
                                onEditConfirm={(input) => onUpdatePrevArt(index, input)}
                                onDelete={() => onDeletePrevArt(index)}
                            />
                        )}
                        <CenterizedScrollTarget className={css({ flexShrink: 0 })}>
                            <Stack align="center" gap="xs" ta="center" style={{ flexShrink: 0 }}>
                                <Image
                                    src={imageUrl}
                                    alt={title}
                                    width={150 * 1.2}
                                    height={100 * 1.2}
                                    style={{ width: 150 * 1.2, height: "auto" }}
                                />
                                {title}
                            </Stack>
                        </CenterizedScrollTarget>
                        {nextArts.map((art, index) =>
                            <RelatedArtListItem
                                key={index}
                                className={css({ flexShrink: 0 })}
                                artInput={art}
                                onEditConfirm={(input) => onUpdateNextArt(index, input)}
                                onDelete={() => onDeleteNextArt(index)}
                            />
                        )}
                        <ActionIcon
                            onClick={() => {
                                setAddTarget("next")
                                addArtDialog.onOpen()
                            }}
                        >
                            <IoMdAdd />
                        </ActionIcon>
                    </CenterizedScroll>
                </Center>
            </FullWidth>

            {actions}

            <EditArtDialog
                {...addArtDialog.dialogProps}
                title="関連作品を追加"
                defaultValues={{ mode: "select" }}
                onEditConfirm={handleAddArt}
            />
        </div>

    )
}
