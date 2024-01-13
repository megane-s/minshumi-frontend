import { SectionTitle } from "@/components/SectionTitle"
import TagSelect from "@/components/TagSelect"
import { FC, ReactNode, useState } from "react"
import { ArtTag } from "@/art/type"
import { Space } from "@mantine/core"
import { TextInput } from "@/components/TextInput"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"
import { Button } from "@/components/Button"
import { notImplementError } from "@/util/notImplement"
import toast from "react-hot-toast"

interface ArtTagFormProps {
    mediaTags: ArtTag[]
    genreTags: ArtTag[]
    otherTags: ArtTag[]
    selectedMediaTags: ArtTag[]
    selectedGenreTags: ArtTag[]
    selectedOtherTags: ArtTag[]
    originalTags: ArtTag[]
    onChangeSelectedMediaTags: (tags: ArtTag[]) => void
    onChangeSelectedGenreTags: (tags: ArtTag[]) => void
    onChangeSelectedOtherTags: (tags: ArtTag[]) => void
    onChangeOriginalTags: (tags: ArtTag[]) => void
    actions: ReactNode
}
export const ArtTagForm: FC<ArtTagFormProps> = ({
    mediaTags, selectedMediaTags, onChangeSelectedMediaTags,
    genreTags, selectedGenreTags, onChangeSelectedGenreTags,
    otherTags, selectedOtherTags, onChangeSelectedOtherTags,
    originalTags, onChangeOriginalTags,
    actions,
}) => {
    const [originalTagInput, setOriginalTagInput] = useState("")
    const isValidOriginalTargetInput = originalTagInput.trim().length >= 1
    const handleAddOriginal = () => {
        if (!isValidOriginalTargetInput) throw notImplementError("不正です")

        if (mediaTags.includes(originalTagInput)) {
            onChangeSelectedMediaTags([...selectedMediaTags, originalTagInput])
            toast(`「${originalTagInput}」をメディア欄に追加しました`)
        } else if (genreTags.includes(originalTagInput)) {
            onChangeSelectedGenreTags([...selectedGenreTags, originalTagInput])
            toast(`「${originalTagInput}」をジャンル欄に追加しました`)
        } else if (otherTags.includes(originalTagInput)) {
            onChangeSelectedOtherTags([...selectedOtherTags, originalTagInput])
            toast(`「${originalTagInput}」をその他欄に追加しました`)
        } else {
            onChangeOriginalTags([...originalTags, originalTagInput.trim()])
            toast(`「${originalTagInput}」を追加しました`)
        }
        setOriginalTagInput("")
    }
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

            <SectionTitle my="md">
                自分で追加
            </SectionTitle>

            {originalTags.length >= 1 &&
                <TagSelect
                    tags={originalTags}
                    selectedTags={originalTags}
                    onChangeSelected={onChangeOriginalTags}
                />
            }

            <div className={flex({ pl: { base: "0", sm: "xl" }, my: "md", gap: "xs" })}>
                <TextInput
                    className={css({ flexGrow: 1 })}
                    placeholder="独自のタグを入力"
                    value={originalTagInput}
                    onChange={e => setOriginalTagInput(e.target.value)}
                />
                <Button onClick={handleAddOriginal} disabled={!isValidOriginalTargetInput}>
                    追加
                </Button>
            </div>

            <Space className={css({ h: "4" })} />

            {actions}
        </div>
    )
}
