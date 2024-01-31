"use client"

import { Carousel, CarouselSlide } from "@/components/Carousel"
import { useClientRendered } from "@/util/client/useClientRendered"
import { em } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import Image, { ImageProps } from "next/image"
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
            slideSize="min(900px, 70%)"
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
            <NewsSlide
                src="/top_panel_0_lg.png"
                alt="みんしゅみ"
                priority
            />
            <NewsSlide
                src="/top_panel_1_lg.png"
                alt="作品をアピールしよう"
                href="/art/new/detail"
                priority
            />
            <NewsSlide
                src="/top_panel_2_lg.png"
                alt="名刺の作成"
                href="/businesscard/new"
                priority
            />
        </Carousel>
    )
}

interface NewsSlideProps {
    href?: string
    src: ImageProps["src"]
    alt: string
    priority?: boolean
}
const NewsSlide: FC<NewsSlideProps> = ({ href, src, alt, priority = false }) => {
    const content = (
        <div className={flex({ flexDir: "column", justify: "center", align: "center" })}>
            <Image
                src={src}
                alt={alt}
                width={800}
                height={450}
                className={css({ width: "100%", height: "auto", objectFit: "contain" })}
                priority={priority}
            />
        </div>
    )
    if (href) {
        return (
            <CarouselSlide>
                <Link href={href}>
                    {content}
                </Link>
            </CarouselSlide>
        )
    }
    return (
        <CarouselSlide>
            {content}
        </CarouselSlide>
    )
}
