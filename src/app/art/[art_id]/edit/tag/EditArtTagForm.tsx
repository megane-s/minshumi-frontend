"use client"

import { ArtTagForm } from "@/art/components/tag/ArtTagForm"
import { getGenreTags, medias, others } from "@/art/components/tag/tags"
import { ArtId, ArtTag } from "@/art/type"
import MutateButton from "@/components/MutateButton"
import { useMutate } from "@/util/client/useMutate"
import { Flex } from "@mantine/core"
import { FC, useState } from "react"
import { handleSaveArtTags } from "./actions"

interface EditArtTagFormProps {
    artId: ArtId
    defaultValues: {
        mediaTags: ArtTag[]
        genreTags: ArtTag[]
        otherTags: ArtTag[]
        originalTags: ArtTag[]
    }
}
export const EditArtTagForm: FC<EditArtTagFormProps> = ({ artId, defaultValues }) => {
    const [selectedMedias, setSelectedMedias] = useState(defaultValues.mediaTags)
    const [selectedGenres, setSelectedGenres] = useState(defaultValues.genreTags)
    const [selectedOthers, setSelectedOthers] = useState(defaultValues.otherTags)
    const [originals, setOriginals] = useState(defaultValues.originalTags)

    const handleSave = useMutate(async () => {
        await handleSaveArtTags(artId, {
            medias: selectedMedias,
            genres: selectedGenres,
            others: selectedOthers,
            originals,
        })
    }, {
        onSuccess: { toast: "更新しました！" },
        onError: { toast: "更新できませんでした..." },
        loading: { toast: "更新中..." },
    })
    return (
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
                <Flex mt="lg" justify="center">
                    <MutateButton variant="filled" size="lg" mutation={handleSave}>
                        更新
                    </MutateButton>
                </Flex>
            }
        />
    )
}
