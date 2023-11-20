import { FC } from "react"
import { ActionIcon as MActionIcon, ActionIconProps as MActionIconProps } from "@mantine/core"
import { FaRegHeart } from "react-icons/fa";

interface ActionIconProps extends MActionIconProps {
}
export const ActionIcon: FC<ActionIconProps> = ({ ...props }) => {
    return (
        <MActionIcon
            variant="filled"
            size="xl"
            aria-label="filled action icon"
            {...props}
        >
            <FaRegHeart />
        </MActionIcon>
    )
}
