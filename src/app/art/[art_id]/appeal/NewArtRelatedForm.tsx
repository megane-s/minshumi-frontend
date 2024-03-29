"use client"

import { FC, useState } from "react"
import { ArtRelatedForm } from "@/art/components/appeal/ArtRelatedForm";
import Navigation from "./Navigation";
import { ArtId, InputRelatedArt } from "@/art/type";

interface NewArtRelatedFormProps {
    title: string
    imageUrl: string
    artId: ArtId
    defaultValues: {
        likePoint: string
        prev: InputRelatedArt[]
        next: InputRelatedArt[]
    }
}
const NewArtRelatedForm: FC<NewArtRelatedFormProps> = ({ title, imageUrl, artId, defaultValues }) => {
    const [likePoint, setLikePoint] = useState(defaultValues.likePoint)

    const {
        prevArts, nextArts,
        addNextArts, addPrevArts,
        updateNextArt, updatePrevArt,
        deletePrevArt, deleteNextArt,
    } = useInputRelatedArts(defaultValues)

    // アピール文が存在するかどうかの判定
    const hasAppeal = !!likePoint.trim() || prevArts.length > 0 || nextArts.length > 0;


    return (
        <ArtRelatedForm
            title={title}
            imageUrl={imageUrl}
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
                <Navigation
                    artId={artId}
                    likePoint={likePoint}
                    prevArts={prevArts}
                    nextArts={nextArts}
                    hasAppeal={hasAppeal}
                />
            }
        />
    )
}

export default NewArtRelatedForm

export const useInputRelatedArts = (defaultValues: NewArtRelatedFormProps["defaultValues"]) => {
    const [prevArts, setPrevArts] = useState(defaultValues.prev ?? [])
    const [nextArts, setNextArts] = useState(defaultValues.next ?? [])
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
