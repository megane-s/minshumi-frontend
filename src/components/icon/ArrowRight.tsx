import { ComponentProps } from "react"
import { FaArrowRight } from "react-icons/fa"

export const ArrowRightIcon = (props: ComponentProps<typeof FaArrowRight>) => {
    return (
        <FaArrowRight {...props} />
    )
}
