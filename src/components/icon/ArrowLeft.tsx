import { ComponentProps } from "react"
import { FaArrowLeft } from "react-icons/fa"

export const ArrowLeftIcon = (props: ComponentProps<typeof FaArrowLeft>) => {
    return (
        <FaArrowLeft {...props} />
    )
}
