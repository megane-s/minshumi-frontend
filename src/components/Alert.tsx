import { Alert as MAlert } from "@mantine/core"
import { ComponentProps } from "react"
import { IoMdInformationCircleOutline } from "react-icons/io"

export const Alert = MAlert

export const InfoIcon = (props: ComponentProps<typeof IoMdInformationCircleOutline>) => {
    return <IoMdInformationCircleOutline {...props} />
}
