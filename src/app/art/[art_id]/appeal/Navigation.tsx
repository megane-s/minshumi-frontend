"use client"

import { FC } from "react"
import { useMutate } from "@/util/client/useMutate"
import { flex } from "styled-system/patterns"
import { handleAppeal } from "./actions"
import { ArtId, InputRelatedArt } from "@/art/type"
import MutateButton from "@/components/MutateButton"

interface NavigationProps {
    artId: ArtId
    likePoint: string
    prevArts: InputRelatedArt[]
    nextArts: InputRelatedArt[]
}
const Navigation: FC<NavigationProps> = ({ artId, likePoint, prevArts, nextArts }) => {
    const handleSubmit = useMutate(async () => {
        await handleAppeal(artId, {
            likePoint,
            prevArts,
            nextArts,
        })
    }, {
        loading: { button: "アピールを登録しています..." },
        onSuccess: { toast: "アピールを登録しました！" },
    })
    return (
        <div
            className={flex({ w: "full", justifyContent: "center", my: "lg" })}
        >
            <MutateButton mutation={handleSubmit} variant="gradient" size="lg">
                アピールを登録
            </MutateButton>
        </div>
    )
}

export default Navigation
