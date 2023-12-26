"use client"

import { Carousel, CarouselSlide } from "@/components/Carousel"
import { useClientRendered } from "@/util/client/useClientRendered"
import { FC } from "react"
import { css } from "styled-system/css"

const fullSize = css({ w: "full", h: "full !important" })

interface TopNewsProps {
}
export const TopNews: FC<TopNewsProps> = () => {
    const clientRendered = useClientRendered()
    return (
        <Carousel
            slideGap="xl"
            slideSize="min(80%, 800px)"
            align="center"
            controlSize={48}
            loop
            classNames={{
                root: css({ h: [200, 350], opacity: clientRendered ? 1 : "0", transition: "opacity 0.1s" }),
                container: fullSize,
                viewport: fullSize,
                control: css({
                    transition: "all 0.3s",
                    "&[data-inactive]": {
                        opacity: "0 !important",
                        cursor: "default !important",
                    },
                }),
            }}
        >
            {/* TODO 各スライドの実装 */}
            <CarouselSlide>
                <div className={css({ w: "full", h: "full", bg: "background.2" })}>
                    panel 1
                </div>
            </CarouselSlide>
            <CarouselSlide>
                <div className={css({ w: "full", h: "full", bg: "background.2" })}>
                    panel 2
                </div>
            </CarouselSlide>
            <CarouselSlide>
                <div className={css({ w: "full", h: "full", bg: "background.2" })}>
                    panel 3
                </div>
            </CarouselSlide>
        </Carousel>
    )
}

