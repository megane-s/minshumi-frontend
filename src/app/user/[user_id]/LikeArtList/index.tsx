import { RecommendArt } from "@/art/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import { LikeArtImage } from "./LikeArtImage"

interface LikeArtListProps {
    arts: RecommendArt[]
}
export const LikeArtList: FC<LikeArtListProps> = ({ arts }) => {
    return (
        <Carousel
            slideSize="fit-content"
            slideGap="sm"
            align="start"
            controlsOffset="0"
        >
            {arts.map(art =>
                <CarouselSlide key={art.artId}>
                    <LikeArtImage
                        art={art}
                    />
                </CarouselSlide>
            )}
        </Carousel>
    )
}
