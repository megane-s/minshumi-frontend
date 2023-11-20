import { FC } from "react"
import { Loader as MLoader, LoaderProps as MLoaderPorps } from "@mantine/core"
interface LoaderProps extends MLoaderPorps {
}
export const Loader: FC<LoaderProps> = ({ ...props }) => {
    return (
        <MLoader {...props} />
    )
}
