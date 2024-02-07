
import Image, { ImageProps } from "next/image"
import TextPopImg from "@/../public/top_text-pop.png"
import TopPanel1Img from "@/../public/top_panel_1.png"

import { FC } from "react"
import { css } from "styled-system/css"
import { center, flex } from "styled-system/patterns"
import { Button } from "@/components/Button"
import { getSession } from "@/auth/server/auth"
import LinkButton from "@/components/LinkButton"
import { login } from "@/auth/client/login"
import { LoginButton } from "@/components/LoginButton"

interface TopNewsProps {
}
export const TopNews: FC<TopNewsProps> = () => {
    return (
        <div
            className={flex({ flexDir: "column" })}
        >
            <Appeal />
        </div>
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
