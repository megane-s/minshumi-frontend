import { FC } from "react"
import { Switch as MSwitch, SwitchProps as MSwitchProps } from "@mantine/core"

interface SwitchProps extends MSwitchProps {
}
export const Switch: FC<SwitchProps> = ({ ...props }) => {
    return (
        <MSwitch {...props} />
    )
}
