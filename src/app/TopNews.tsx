"use client"

import { Carousel, CarouselSlide } from "@/components/Carousel"
import { useClientRendered } from "@/util/client/useClientRendered"
import { Image, em } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import Link from "next/link"

import { FC } from "react"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"

const fullSize = css({ w: "full", h: "full !important" })

interface TopNewsProps {
}
export const TopNews: FC<TopNewsProps> = () => {
    const clientRendered = useClientRendered()
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
    return (
        <Carousel
            slideSize="100%"
            align="center"
            controlSize={isMobile ? 40 : 64}
            controlsOffset={isMobile ? 2 : "xl"}
            loop
            classNames={{
                root: css({ opacity: clientRendered ? 1 : "0", transition: "opacity 0.1s" }),
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
            <CarouselSlide>
                <div className={flex({ flexDir: "column", justify: "center", align: "center" })}>
                    <Image
                        src="/top_panel_0_lg.png"
                        alt=""
                        width={800}
                        height={450}
                        style={{ width: "100%", objectFit: "contain", maxWidth: "700px" }}
                    />
                </div>
            </CarouselSlide>
            <CarouselSlide>
                <Link href="/art/new/detail">
                    <div className={flex({ flexDir: "column", justify: "center", align: "center" })}>
                        <Image
                            src="/top_panel_1_lg.png"
                            alt=""
                            width={800}
                            height={450}
                            style={{ width: "100%", height: "100%", objectFit: "contain", maxWidth: "700px" }}
                        />
                    </div>
                </Link>
            </CarouselSlide>
            <CarouselSlide>
                <Link href="/notification#recommendations">
                    <div className={flex({ flexDir: "column", justify: "center", align: "center" })}>
                        <Image
                            src="/top_panel_2_lg.png"
                            alt=""
                            width={800}
                            height={450}
                            style={{ width: "100%", height: "100%", objectFit: "contain", maxWidth: "700px" }}
                        />
                    </div>
                </Link>
            </CarouselSlide>
        </Carousel>
    )
}

