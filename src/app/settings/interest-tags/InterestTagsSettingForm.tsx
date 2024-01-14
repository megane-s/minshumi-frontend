"use client"

import { ArtTagForm } from "@/art/components/tag/ArtTagForm"
import { getGenreTags, medias, others } from "@/art/components/tag/tags"
import { ArtTag } from "@/art/type"
import MutateButton from "@/components/MutateButton"
import { CheckIcon } from "@/components/icon/Check"
import { useMutate } from "@/util/client/useMutate"
import { FC, useState } from "react"
import { center } from "styled-system/patterns"
import { handleUpdateInterestTags } from "./actions"

interface InterestTagsSettingFormProps {
    defaultValues: {
        mediaTags: ArtTag[]
        genreTags: ArtTag[]
        otherTags: ArtTag[]
        originalTags: ArtTag[]
    }
}
const InterestTagsSettingForm: FC<InterestTagsSettingFormProps> = ({ defaultValues }) => {
    const [selectedMedias, setSelectedMedias] = useState<ArtTag[]>(defaultValues.mediaTags)
    const [selectedGenres, setSelectedGenres] = useState<ArtTag[]>(defaultValues.genreTags)
    const [selectedOthers, setSelectedOthers] = useState<ArtTag[]>(defaultValues.otherTags)
    const [originals, setOriginals] = useState<ArtTag[]>(defaultValues.originalTags)

    const save = useMutate(async () => {
        await handleUpdateInterestTags({
            mediaTags: selectedMedias,
            genreTags: selectedGenres,
            otherTags: selectedOthers,
            originalTags: originals,
        })
    }, {
        loading: { toast: "設定中..." },
        onSuccess: { toast: "設定しました！" },
        onError: { toast: "設定できませんでした..." },
    })
    return (
        <div>
            <ArtTagForm
                mediaTags={medias}
                genreTags={getGenreTags(selectedMedias)}
                otherTags={others}
                selectedMediaTags={selectedMedias}
                selectedGenreTags={selectedGenres}
                selectedOtherTags={selectedOthers}
                originalTags={originals}
                onChangeSelectedMediaTags={setSelectedMedias}
                onChangeSelectedGenreTags={setSelectedGenres}
                onChangeSelectedOtherTags={setSelectedOthers}
                onChangeOriginalTags={setOriginals}
                actions={
                    <div className={center({ mb: "6" })}>
                        <MutateButton
                            mutation={save}
                            variant="filled"
                            leftSection={<CheckIcon />}
                        >
                            興味のあるタグを保存
                        </MutateButton>
                    </div>
                }
            />
        </div>
    )
}

export default InterestTagsSettingForm
