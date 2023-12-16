"use client"

import { Center, Image, Stack, Text } from "@mantine/core"
import { FC, useState } from "react"
import { IoMdAdd } from "react-icons/io";
import { ActionIcon } from "@/components/ActionIcon"
import FullWidth from "@/app/BaseLayout/FullWidth";
import CenterizedScroll, { CenterizedScrollTarget } from "./CenterizedScroll";
import styles from "./NewArtRelatedForm.module.css"
import RelatedArtListItem from "./RelatedArtListItem";
import { InputRelatedArt, NewArtSessionInput } from "@/art/newArtSession/type";
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField";
import { Textarea } from "@/components/Textarea";
import { useDialog } from "@/components/Dialog";
import EditArtDialog from "./EditArtDialog/EditArtDialog";

interface NewArtRelatedFormProps {
    defaultValues: Pick<NewArtSessionInput, "prevArts" | "nextArts">
}
const NewArtRelatedForm: FC<NewArtRelatedFormProps> = ({ defaultValues }) => {
    const [likePoint, setLikePoint] = useInputNewArtSessionField<"likePoint", string>("likePoint", "", "/new/art/appeal")

    const {
        prevArts, nextArts,
        addNextArts, addPrevArts,
        updateNextArt, updatePrevArt,
        deletePrevArt, deleteNextArt,
    } = useInputRelatedArts(defaultValues)

    const [addTarget, setAddTarget] = useState<null | "prev" | "next">(null)
    const addArtDialog = useDialog()
    const handleAddArt = (art: InputRelatedArt) => {
        if (addTarget === null) return
        if (addTarget === "prev") {
            addPrevArts(art)
        } else {
            addNextArts(art)
        }
        setAddTarget(null)
    }

    return (
        <div>
            <Text ta="center">好きなポイント</Text>
            <Center my="md" w="100%">
                <Textarea
                    value={likePoint}
                    onChange={e => setLikePoint(e.target.value)}
                    w="500px"
                    maw="100%"
                    mb="xl"
                    rows={4}
                />
            </Center>

            <Text ta="center">前後に見た作品</Text>
            <FullWidth>
                <Center>
                    <CenterizedScroll className={styles.arts}>
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
                                artInput={art}
                                onEditConfirm={(input) => updatePrevArt(index, input)}
                                onDelete={() => deletePrevArt(index)}
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
                                onEditConfirm={(input) => updateNextArt(index, input)}
                                onDelete={() => deleteNextArt(index)}
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

            <EditArtDialog
                {...addArtDialog.dialogProps}
                title="関連作品を追加"
                defaultValues={{ mode: "select" }}
                onEditConfirm={handleAddArt}
            />
        </div>
    )
}

export default NewArtRelatedForm

export const useInputRelatedArts = (defaultValues: Pick<NewArtSessionInput, "prevArts" | "nextArts">) => {
    const [prevArts, setPrevArts] = useInputNewArtSessionField("prevArts", defaultValues.prevArts ?? [], "/new/art/appeal")
    const [nextArts, setNextArts] = useInputNewArtSessionField("nextArts", defaultValues.nextArts ?? [], "/new/art/appeal")
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
        setNextArts(p => {
            const newState = [...p]
            newState[index] = art
            return newState
        })
    }
    const deletePrevArt = (index: number) => {
        setPrevArts(p => p.filter((_, i) => i !== index))
    }
    const deleteNextArt = (index: number) => {
        setNextArts(p => p.filter((_, i) => i !== index))
    }
    return {
        prevArts,
        nextArts,
        addPrevArts,
        addNextArts,
        updatePrevArt,
        updateNextArt,
        deletePrevArt,
        deleteNextArt
    }
}
