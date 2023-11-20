import { FC } from "react"
import { Textarea as MTextarea, TextareaProps as MTextareaProps } from "@mantine/core"

interface TextareaProps extends MTextareaProps {
}
export const Textarea: FC<TextareaProps> = ({ ...props }) => {
    return (
        <MTextarea
            {...props}
        />
    )
}
