import '@mantine/carousel/styles.css'

import { FC } from "react"
import { Carousel as MCarousel, CarouselProps as MCarouselProps } from "@mantine/carousel"

interface CarouselProps extends MCarouselProps {
}
export const Carousel: FC<CarouselProps> = ({ ...props }) => {
    return (
        <MCarousel {...props} />
    )
}

export const CarouselSlide = MCarousel.Slide
