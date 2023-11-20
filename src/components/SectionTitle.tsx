import { Title, TitleProps } from "@mantine/core"
import { FC } from "react"

interface SectionTitleProps extends TitleProps {
}
export const SectionTitle: FC<SectionTitleProps> = ({ ...props }) => {
    return (
        <Title order={2} size="h4" {...props}>
        </Title>
    )
}
