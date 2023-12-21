"use client"

import { ArtRelatedForm } from "@/art/components/appeal/ArtRelatedForm"
import { InputRelatedArt } from "@/art/newArtSession/type"
import { RecommendArt } from "@/art/type"
import MutateButton from "@/components/MutateButton"
import { useMutate } from "@/util/client/useMutate"
import { sleep } from "@/util/sleep"
import { Flex } from "@mantine/core"
import { FC, useState } from "react"

interface EditArtRelatedFormProps {
    defaultValues: Pick<RecommendArt, "likePoint"> & {
        prevArts: InputRelatedArt[]
        nextArts: InputRelatedArt[]
    }
}
export const EditArtRelatedForm: FC<EditArtRelatedFormProps> = ({
    defaultValues,
}) => {
    const [likePoint, setLikePoint] = useState(defaultValues.likePoint)

    const {
        prevArts, nextArts,
        addPrevArts, addNextArts,
        updatePrevArt, updateNextArt,
        deletePrevArt, deleteNextArt,
    } = useInputRelatedArts(defaultValues)

    const handleSave = useMutate(async () => {
        await sleep(1000)
    }, {
        loading: { toast: "更新中..." },
        onSuccess: { toast: "更新しました！" },
        onError: { toast: "更新できませんでした..." },
    })

    return (
        <ArtRelatedForm
            likePoint={likePoint}
            onChangeLikePoint={setLikePoint}
            prevArts={prevArts}
            nextArts={nextArts}
            onAddPrevArt={addPrevArts}
            onAddNextArt={addNextArts}
            onUpdatePrevArt={updatePrevArt}
            onUpdateNextArt={updateNextArt}
            onDeletePrevArt={deletePrevArt}
            onDeleteNextArt={deleteNextArt}
            actions={<Flex mt="lg" justify="center">
                <MutateButton variant="filled" size="lg" mutation={handleSave}>
                    更新
                </MutateButton>
            </Flex>}
        />
    )
}

export const useInputRelatedArts = (defaultValues: EditArtRelatedFormProps["defaultValues"]) => {
    const [prevArts, setPrevArts] = useState(defaultValues.prevArts)
    const [nextArts, setNextArts] = useState(defaultValues.nextArts)
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
