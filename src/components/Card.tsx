import { FC, ReactNode } from "react"
import { Card as MCard, CardProps as MCardProps } from "@mantine/core"

interface CardProps extends MCardProps {
    children: ReactNode // Cardで囲んだ子要素
}
export const Card: FC<CardProps> = ({ children, ...props }) => {
    return (
        <MCard {...props}>
            {children}
        </MCard>
    )
}

export const CardSection = MCard.Section
