"use client"

import { Center, Image, Stack } from "@mantine/core"
import { FC, Fragment, useMemo, useState } from "react"
import { IoMdAdd } from "react-icons/io";
import { ActionIcon } from "@/components/ActionIcon"
import FullWidth from "@/app/BaseLayout/FullWidth";
import EditArtDialog from "./EditArtDialog";
import CenterizedScroll, { CenterizedScrollTarget } from "./CenterizedScroll";
import styles from "./NewArtRelatedForm.module.css"
import { InputRelatedArt } from "../type";
import RelatedArtListItem from "./RelatedArtListItem";
import { NewArtSessionInput } from "@/art/newArtSession/type";
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField";

interface NewArtRelatedFormProps {
    defaultValues: Pick<NewArtSessionInput, "prevArts" | "nextArts">
}
const NewArtRelatedForm: FC<NewArtRelatedFormProps> = ({ defaultValues }) => {
    const { prevArts, nextArts, addNextArts, addPrevArts, updateNextArt, updatePrevArt } = useInputRelatedArts(defaultValues)
    const [updateTarget, setUpdateTarget] = useState<
        | null
        | { type: "add", to: "prev" | "next" }
        | { type: "update", to: "prev" | "next", index: number }
    >(null)
    const openEditDialog = !!updateTarget
    const editArtDialogDefaultValue = useMemo(() => {
        if (updateTarget?.type !== "update") {
            return {}
        }
        const arts = updateTarget.to === "prev" ? prevArts : nextArts
        return arts[updateTarget.index]
    }, [nextArts, prevArts, updateTarget])
    const handleEditArtDialogConfirm = (artInput: InputRelatedArt) => {
        if (updateTarget?.type === "add") {
            const addArt = updateTarget.to === "prev" ? addPrevArts : addNextArts
            addArt(artInput)
        } else if (updateTarget?.type === "update") {
            const updateArt = updateTarget.to === "prev" ? updatePrevArt : updateNextArt
            updateArt(updateTarget.index, artInput)
        }
    }
    return (
        <div>
            <FullWidth>
                <Center>
                    <CenterizedScroll className={styles.arts}>
                        <ActionIcon onClick={() => setUpdateTarget({ type: "add", to: "prev" })}>
                            <IoMdAdd />
                        </ActionIcon>
                        {prevArts.map((art, index) =>
                            <RelatedArtListItem
                                key={index}
                                artInput={art}
                                onClickRelatedArt={() => { setUpdateTarget({ type: "update", to: "prev", index: index }) }}
                            />
                        )}
                        <CenterizedScrollTarget>
                            <Stack align="center" gap="xs" ta="center">
                                <Image
                                    src="/placeholder/300x200_red.png"
                                    alt="テスト"
                                    width={150 * 1.2}
                                    height={100 * 1.2}
                                    style={{ width: 150 * 1.2, height: "auto" }}
                                />
                                鬼滅の刃
                            </Stack>
                        </CenterizedScrollTarget>
                        {nextArts.map((art, index) =>
                            <RelatedArtListItem
                                key={index}
                                artInput={art}
                                onClickRelatedArt={() => { setUpdateTarget({ type: "update", to: "next", index: index }) }}
                            />
                        )}
                        <ActionIcon onClick={() => setUpdateTarget({ type: "add", to: "next" })}>
                            <IoMdAdd />
                        </ActionIcon>
                    </CenterizedScroll>
                </Center>
            </FullWidth>

            <Fragment key={String(openEditDialog)}>
                <EditArtDialog
                    defaultValues={editArtDialogDefaultValue}
                    opened={openEditDialog} onClose={() => setUpdateTarget(null)}
                    onConfirm={handleEditArtDialogConfirm}
                />
            </Fragment>
        </div>
    )
}

export default NewArtRelatedForm

export const useInputRelatedArts = (defaultValues: Pick<NewArtSessionInput, "prevArts" | "nextArts">) => {
    const [prevArts, setPrevArts] = useInputNewArtSessionField("prevArts", defaultValues.prevArts ?? [], "/new/art/related")
    const [nextArts, setNextArts] = useInputNewArtSessionField("nextArts", defaultValues.nextArts ?? [], "/new/art/related")
    const addPrevArts = (art: InputRelatedArt) => {
        setPrevArts(p => [art, ...p])
    }
    const addNextArts = (art: InputRelatedArt) => {
        setNextArts(p => [...p, art])
    }
    const updatePrevArt = (index: number, art: InputRelatedArt) => {
        setPrevArts(p => {
            const newState = [...p]
            newState[index] = art
            return newState
        })
    }
    const updateNextArt = (index: number, art: InputRelatedArt) => {
        setPrevArts(p => {
            const newState = [...p]
            newState[index] = art
            return newState
        })
    }
    return {
        prevArts,
        nextArts,
        addPrevArts,
        addNextArts,
        updatePrevArt,
        updateNextArt,
    }
}
