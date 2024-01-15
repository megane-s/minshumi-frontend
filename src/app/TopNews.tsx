"use client"

import { Carousel, CarouselSlide } from "@/components/Carousel"
import { useClientRendered } from "@/util/client/useClientRendered"
import { Button, Image } from "@mantine/core"

import { FC } from "react"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"

const fullSize = css({ w: "full", h: "full !important" })

interface TopNewsProps {
}
export const TopNews: FC<TopNewsProps> = () => {
    const clientRendered = useClientRendered()
    return (
        <Carousel
            // slideGap="xl"
            // slideSize="min(80%, 800px)"
            slideSize="100%"
            // align="center"
            controlSize={48}
            loop
            classNames={{
                root: css({ h: [250, 350], opacity: clientRendered ? 1 : "0", transition: "opacity 0.1s" }),
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
                <Image
                    src="/top_panel_0_lg.png"
                    alt=""
                    width={800}
                    height={450}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
            </CarouselSlide>
            <CarouselSlide>
                <div className={flex({ flexDir: "column", justify: "center", align: "center", w: "full", h: "full" })}>
                    <Image
                        src="/top_panel_1_lg.png"
                        alt=""
                        width={800}
                        height={450}
                        style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    />
                    <Button
                        variant="outline"
                        bg="background.2"
                        radius="xl"
                        className={css()}
                        style={{
                            zIndex: 10000,
                        }}
                    >
                        作品を登録する
                    </Button>
                </div>
            </CarouselSlide>
            <CarouselSlide>
                <div className={flex({ flexDir: "column", justify: "center", align: "center", w: "full", h: "full" })}>
                    <Image
                        src="/top_panel_2_lg.png"
                        alt=""
                        width={800}
                        height={450}
                        style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    />
                    <Button
                        variant="outline"
                        bg="background.2"
                        radius="xl"
                        className={css()}
                        style={{
                            zIndex: 10000,
                        }}
                    >
                        届いた作品を見てみる
                    </Button>
                </div>
            </CarouselSlide>
        </Carousel>
    )
}

