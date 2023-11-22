import { FC, ReactNode } from "react"
import { ActionIcon as MActionIcon, ActionIconProps as MActionIconProps } from "@mantine/core"

interface ActionIconProps extends MActionIconProps {
    children: ReactNode
}
export const ActionIcon: FC<ActionIconProps> = ({ children, ...props }) => {
    return (
        <MActionIcon
            variant="filled"
            size="xl"
            aria-label="filled action icon"
            {...props}
        >
            {children}
        </MActionIcon>
    )
}
