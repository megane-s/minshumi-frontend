import { FC } from "react"
import { TagsInput as MTagsInput, TagsInputProps as MTagsInputPops } from "@mantine/core"

interface TagsInputProps extends MTagsInputPops {
}
export const TagsInput: FC<TagsInputProps> = ({ ...props }) => {
    return (
        <MTagsInput {...props} />
    )
}
