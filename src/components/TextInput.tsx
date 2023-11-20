import { FC } from "react"
import { TextInput as MTextInput, TextInputProps as MTextInputProps } from "@mantine/core"

interface TextInputProps extends MTextInputProps {
}
export const TextInput: FC<TextInputProps> = ({ ...props }) => {
    return (
        <MTextInput
            {...props}
        />
    )
}
