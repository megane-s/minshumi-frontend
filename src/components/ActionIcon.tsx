import { ComponentProps, FC, ReactNode } from "react"
import { ActionIcon as MActionIcon } from "@mantine/core"

type ActionIconProps = ComponentProps<typeof MActionIcon<"button">> & {
    children: ReactNode
}
export const ActionIcon: FC<ActionIconProps> = ({ children, ...props }) => {
    return (
        <MActionIcon<"button">
            variant="filled"
            size="xl"
            aria-label="filled action icon"
            {...props}
        >
            {children}
        </MActionIcon>
    )
}
