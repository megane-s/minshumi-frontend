import { ComponentProps } from "react"
import { FaArrowDown } from "react-icons/fa"

export const ArrowDownIcon = (props: ComponentProps<typeof FaArrowDown>) => {
    return (
        <FaArrowDown {...props} />
    )
}
