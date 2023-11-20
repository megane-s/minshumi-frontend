import { Title, TitleProps } from "@mantine/core"
import { FC } from "react"

interface PageTitleProps extends TitleProps {
}
export const PageTitle: FC<PageTitleProps> = ({ ...props }) => {
    return (
        <Title order={1} {...props}>
        </Title>
    )
}
