"use client"
import { FC } from "react"
import TagSelect from "@/components/TagSelect"
import { SectionTitle } from "@/components/SectionTitle"
import NewArtNavigation from "../Navigation"
import { Space } from "@mantine/core"
import { medias, others, getGenreTags } from "./tags"
import { useInputNewArtSessionField } from "@/art/newArtSession/useInputNewArtSessionField"
import { NewArtSession } from "@/art/newArtSession/type"


interface NewArtTagFormProps {
    defaultValues: Pick<NewArtSession, "mediaTags" | "genreTags" | "otherTags">
}
const NewArtTagForm: FC<NewArtTagFormProps> = ({ defaultValues }) => {
    const [selectedMedias, setSelectedMedias] = useInputNewArtSessionField("mediaTags", defaultValues.mediaTags, "")
    const [selectedGenres, setSelectedGenres] = useInputNewArtSessionField("genreTags", defaultValues.genreTags, "")
    const [selectedOthers, setSelectedOthers] = useInputNewArtSessionField("otherTags", defaultValues.otherTags, "")
    return (
        <div>
            <SectionTitle my="md">
                メディア
            </SectionTitle>

            <TagSelect
                tags={medias}
                selectedTags={selectedMedias}
                onChangeSelected={setSelectedMedias}
            />

            <SectionTitle my="md">
                ジャンル
            </SectionTitle>

            <TagSelect
                tags={getGenreTags(selectedMedias)}
                selectedTags={selectedGenres}
                onChangeSelected={setSelectedGenres}
            />

            <SectionTitle my="md">
                その他
            </SectionTitle>

            <TagSelect
                tags={others}
                selectedTags={selectedOthers}
                onChangeSelected={setSelectedOthers}
            />

            <Space h="50px" />

            <NewArtNavigation
                prevHref="/art/new/detail#"
                nextHref="/art/new/related#"
            />
        </div>
    )
}

export default NewArtTagForm
