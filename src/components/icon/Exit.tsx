import { ComponentProps } from "react"
import { BiExit } from "react-icons/bi"

export const ExitIcon = (props: ComponentProps<typeof BiExit>) => {
    return (
        <BiExit {...props} />
    )
}
