import { ComponentProps } from "react"
import { BiError } from "react-icons/bi";

export const ErrorIcon = (props: ComponentProps<typeof BiError>) => {
    return (
        <BiError {...props} />
    )
}
