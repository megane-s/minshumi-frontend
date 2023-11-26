"use client"
import { FC } from "react"
import { useState } from "react"
import TagSelect from "@/components/TagSelect"
import { ArtTag } from "@/art/type"
import { SectionTitle } from "@/components/SectionTitle"
import NewArtNavigation from "../Navigation"
import { Space } from "@mantine/core"
import { medias, others, getGenreTags } from "./tags"


interface NewArtTagFormProps {
}
const NewArtTagForm: FC<NewArtTagFormProps> = () => {
    const [selectedMedias, setSelectedMedias] = useState<ArtTag[]>([])
    const [selectedGenres, setSelectedGenres] = useState<ArtTag[]>([])
    const [selectedOthers, setSelectedOthers] = useState<ArtTag[]>([])
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
