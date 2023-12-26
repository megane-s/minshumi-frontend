import { ComponentProps } from "react"
import { FaArrowUp } from "react-icons/fa"

export const ArrowUpIcon = (props: ComponentProps<typeof FaArrowUp>) => {
    return (
        <FaArrowUp {...props} />
    )
}
