import { SectionTitle, SectionTitleProps } from "@/components/SectionTitle"
import { FC, ReactNode } from "react"

interface NewArtSectionTitleProps extends SectionTitleProps {
    children: ReactNode
}
const NewArtSectionTitle: FC<NewArtSectionTitleProps> = ({ children, ...props }) => {
    return (
        <SectionTitle ta="center" my="sm" {...props}>
            {children}
        </SectionTitle>
    )
}

export default NewArtSectionTitle
