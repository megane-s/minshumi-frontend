"use client"

import { Box } from "@mantine/core"
import { FC } from "react"
import FullWidth from "@/app/BaseLayout/FullWidth";
import { InputRelatedArt, NewArtSessionInput } from "@/art/newArtSession/type";
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField";
import { ArtRelatedForm } from "@/art/components/appeal/ArtRelatedForm";
import Navigation from "./Navigation";

interface NewArtRelatedFormProps {
    title: string
    defaultValues: Pick<NewArtSessionInput, "prevArts" | "nextArts" | "artId">
}
const NewArtRelatedForm: FC<NewArtRelatedFormProps> = ({ title, defaultValues }) => {
    const [likePoint, setLikePoint] = useInputNewArtSessionField<"likePoint", string>("likePoint", "", "/new/art/appeal")

    const {
        prevArts, nextArts,
        addNextArts, addPrevArts,
        updateNextArt, updatePrevArt,
        deletePrevArt, deleteNextArt,
    } = useInputRelatedArts(defaultValues)

    return (
        <ArtRelatedForm
            title={title}
            likePoint={likePoint}
            onChangeLikePoint={setLikePoint}
            prevArts={prevArts}
            onAddPrevArt={addPrevArts}
            onUpdatePrevArt={updatePrevArt}
            onDeletePrevArt={deletePrevArt}
            nextArts={nextArts}
            onAddNextArt={addNextArts}
            onUpdateNextArt={updateNextArt}
            onDeleteNextArt={deleteNextArt}
            actions={
                <FullWidth>
                    <Box py="xl">
                        <Navigation
                            artId={defaultValues.artId ?? null}
                        />
                    </Box>
                </FullWidth>
            }
        />
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
