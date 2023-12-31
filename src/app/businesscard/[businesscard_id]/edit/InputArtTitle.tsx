import { useSuggestTitle } from "@/art/components/SelectArt"
import { Autocomplete } from "@mantine/core"
import { ComponentProps, FC } from "react"
import { cx } from "styled-system/css"

interface InputArtTitleProps extends ComponentProps<typeof Autocomplete> {
    title: string
    onChangeTitle: (title: string) => void
}
export const InputArtTitle: FC<InputArtTitleProps> = ({ className, title, onChangeTitle, ...props }) => {
    const suggestions = useSuggestTitle(title)
    return (
        <Autocomplete
            className={cx(className)}
            data={Array.from(new Set(suggestions.data?.map(suggest => suggest.title))) ?? []}
            value={title ?? ""}
            onChange={(art) => onChangeTitle(art)}
            placeholder="作品名を入力"
            {...props}
        />
    )
}
