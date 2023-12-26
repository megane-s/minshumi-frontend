import { Art, ArtTag } from "@/art/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import { Link } from "@/components/Link"
import LinkButton from "@/components/LinkButton"
import { ArrowRightIcon } from "@/components/icon/ArrowRight"
import Image from "next/image"
import { FC } from "react"
import { css } from "styled-system/css"
import { flex } from "styled-system/patterns"

interface ArtsListProps {
    tag: ArtTag
    arts: Art[]
}
export const ArtsList: FC<ArtsListProps> = ({ tag, arts }) => {
    return (
        <Carousel
            slideSize="fit-content"
            slideGap="sm"
            align="start"
            controlsOffset="0"
        >
            {arts.map(art =>
                <CarouselSlide key={art.artId}>
                    <Link href={`/art/${art.artId}`}>
                        <Image
                            className={css({ w: "auto", h: { base: "80px", md: "120px", } })}
                            src={art.imageUrl}
                            alt={art.title}
                            width={300}
                            height={200}
                        />
                    </Link>
                </CarouselSlide>
            )}
            <CarouselSlide>
                <div className={flex({ align: "center", h: "full" })}>
                    <LinkButton variant="outline" href={`/tag/${tag}`} rightSection={<ArrowRightIcon />}>
                        もっと見る
                    </LinkButton>
                </div>
            </CarouselSlide>
        </Carousel>
    )
}
