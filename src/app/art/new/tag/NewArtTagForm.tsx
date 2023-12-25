"use client"
import { FC } from "react"
import NewArtNavigation from "../Navigation"
import { medias, others, getGenreTags } from "@/art/components/tag/tags"
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField"
import { NewArtSession } from "@/art/newArtSession/type"
import { ArtTagForm } from "@/art/components/tag/ArtTagForm"


interface NewArtTagFormProps {
    defaultValues: Pick<NewArtSession, "mediaTags" | "genreTags" | "otherTags">
}
const NewArtTagForm: FC<NewArtTagFormProps> = ({ defaultValues }) => {
    const [selectedMedias, setSelectedMedias] = useInputNewArtSessionField("mediaTags", defaultValues.mediaTags ?? [], "")
    const [selectedGenres, setSelectedGenres] = useInputNewArtSessionField("genreTags", defaultValues.genreTags ?? [], "")
    const [selectedOthers, setSelectedOthers] = useInputNewArtSessionField("otherTags", defaultValues.otherTags ?? [], "")
    return (
        <ArtTagForm
            mediaTags={medias}
            genreTags={getGenreTags(medias)}
            otherTags={others}
            selectedMediaTags={selectedMedias}
            selectedGenreTags={selectedGenres}
            selectedOtherTags={selectedOthers}
            onChangeSelectedMediaTags={setSelectedMedias}
            onChangeSelectedGenreTags={setSelectedGenres}
            onChangeSelectedOtherTags={setSelectedOthers}
            actions={
                <NewArtNavigation
                    prevHref="/art/new/detail#"
                    nextHref="/art/new/appeal#"
                />
            }
        />
    )
}

export default NewArtTagForm
