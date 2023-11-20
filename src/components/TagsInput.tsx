import { FC } from "react"
import { TagsInput as MTagsInput, TagsInputProps as MTagsInputProps } from "@mantine/core"

interface TagsInputProps extends MTagsInputProps {
}
export const TagsInput: FC<TagsInputProps> = ({ ...props }) => {
    return (
        <MTagsInput {...props} />
    )
}
