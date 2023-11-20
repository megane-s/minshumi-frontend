import { FC } from "react"
import { Avatar as MAvatar, AvatarProps as MAvatarProps } from "@mantine/core"

interface AvatarProps extends MAvatarProps {
}
export const Avatar: FC<AvatarProps> = ({ ...props }) => {
    return (
        <MAvatar
            {...props}
        />

    )
}
