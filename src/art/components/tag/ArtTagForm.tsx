import { SectionTitle } from "@/components/SectionTitle"
import TagSelect from "@/components/TagSelect"
import { FC, ReactNode } from "react"
import { ArtTag } from "@/art/type"
import { Space } from "@mantine/core"

interface ArtTagFormProps {
    mediaTags: ArtTag[]
    genreTags: ArtTag[]
    otherTags: ArtTag[]
    selectedMediaTags: ArtTag[]
    selectedGenreTags: ArtTag[]
    selectedOtherTags: ArtTag[]
    onChangeSelectedMediaTags: (tags: ArtTag[]) => void
    onChangeSelectedGenreTags: (tags: ArtTag[]) => void
    onChangeSelectedOtherTags: (tags: ArtTag[]) => void
    actions: ReactNode
}
export const ArtTagForm: FC<ArtTagFormProps> = ({
    mediaTags, selectedMediaTags, onChangeSelectedMediaTags,
    genreTags, selectedGenreTags, onChangeSelectedGenreTags,
    otherTags, selectedOtherTags, onChangeSelectedOtherTags,
    actions,
}) => {
    return (
        <div>
            <SectionTitle my="md">
                メディア
            </SectionTitle>

            <TagSelect
                tags={mediaTags}
                selectedTags={selectedMediaTags}
                onChangeSelected={onChangeSelectedMediaTags}
            />

            <SectionTitle my="md">
                ジャンル
            </SectionTitle>

            <TagSelect
                tags={genreTags}
                selectedTags={selectedGenreTags}
                onChangeSelected={onChangeSelectedGenreTags}
            />

            <SectionTitle my="md">
                その他
            </SectionTitle>

            <TagSelect
                tags={otherTags}
                selectedTags={selectedOtherTags}
                onChangeSelected={onChangeSelectedOtherTags}
            />

            <Space h="50px" />

            {actions}
        </div>
    )
}
