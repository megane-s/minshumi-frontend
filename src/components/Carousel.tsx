"use client"

import '@mantine/carousel/styles.css'
import { FC } from "react"
import { Carousel as MCarousel, CarouselProps as MCarouselProps } from "@mantine/carousel"
import classes from './Carousel.module.css'
// import Autoplay from 'embla-carousel-autoplay';

interface CarouselProps extends MCarouselProps {
}
export const Carousel: FC<CarouselProps> = ({ ...props }) => {
    // TODO オートプレイ機能はいったん保留
    // const autoplay = useRef(Autoplay({ delay: 2000 }));
    return (
        <MCarousel
            classNames={classes}
            // plugins={[autoplay.current]}
            // onMouseEnter={autoplay.current.stop}
            // onMouseLeave={autoplay.current.reset}
            {...props}
        />
    )
}

export const CarouselSlide = MCarousel.Slide
