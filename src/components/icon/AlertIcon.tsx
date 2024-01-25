import { ComponentProps } from "react"
import { IoMdAlert } from "react-icons/io"

export const AlertIcon = (props: ComponentProps<typeof IoMdAlert>) => {
    return (
        <IoMdAlert {...props} />
    )
}
