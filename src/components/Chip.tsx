import { FC } from "react"
import { Chip as MChip, ChipProps as MChipProps } from "@mantine/core"

interface ChipProps extends MChipProps {
}
export const Chip: FC<ChipProps> = ({ ...props }) => {
    return (
        <MChip {...props} />
    )
}
