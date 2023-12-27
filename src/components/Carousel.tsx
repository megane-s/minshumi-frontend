"use client"

import '@mantine/carousel/styles.css'
import { Carousel as MCarousel } from "@mantine/carousel"
import { ComponentProps } from 'react'
import { useClientRendered } from '@/util/client/useClientRendered'
import { css, cx } from 'styled-system/css'
// import Autoplay from 'embla-carousel-autoplay';

// TODO オートプレイ機能
export const Carousel = (props: ComponentProps<typeof MCarousel>) => {
    const clientRendered = useClientRendered()
    return (
        <MCarousel
            className={cx(css({ opacity: clientRendered ? 1 : "0", transition: "opacity 0.1s" }), props.className)}
            {...props}
        >
            {props.children}
        </MCarousel>
    )
}

export const CarouselSlide = MCarousel.Slide
