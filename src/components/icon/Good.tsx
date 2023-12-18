import { ComponentProps } from "react"
import { FaRegHeart } from "react-icons/fa";

export const GoodIcon = (props: ComponentProps<typeof FaRegHeart>) => {
    return (
        <FaRegHeart {...props} />
    )
}
