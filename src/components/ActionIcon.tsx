import { FC } from "react"
import { ActionIcon as MActionIcon, ActionIconProps as MActionIconProps } from "@mantine/core"
import { FaRegHeart } from "react-icons/fa";

interface ActionIconProps extends MActionIconProps {
}
export const ActionIcon: FC<ActionIconProps> = () => {
    return (
        <MActionIcon
            variant="gradient"
            size="xl"
            aria-label="Gradient action icon"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
            <FaRegHeart />
        </MActionIcon>
    )
}
