import { FC } from "react"
import { Badge as MBadge, BadgeProps as MBadgeProps } from "@mantine/core"

interface BadgeProps extends MBadgeProps {
}
export const Badge: FC<BadgeProps> = ({ style, ...props }) => {
    return (
        <MBadge
            // 自動的に大文字になるのを防ぐ
            style={{ ...style, textTransform: "none" }}
            {...props}
        />
    )
}
