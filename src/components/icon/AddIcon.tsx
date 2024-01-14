import { ComponentProps } from "react"
import { IoMdAdd } from "react-icons/io"

export const AddIcon = (props: ComponentProps<typeof IoMdAdd>) => {
    return (
        <IoMdAdd {...props} />
    )
}
