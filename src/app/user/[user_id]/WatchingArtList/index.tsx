import { Art } from "@/art/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import { ArtImage } from "./ArtImage"

interface WatchingArtListProps {
    arts: Art[]
}
export const WatchingArtList: FC<WatchingArtListProps> = ({ arts }) => {
    return (
        <Carousel
            slideSize="fit-content"
            slideGap="sm"
            align="start"
            controlsOffset="0"
        >
            {arts.map(art =>
                <CarouselSlide key={art.artId}>
                    <ArtImage
                        art={art}
                    />
                </CarouselSlide>
            )}
        </Carousel>
    )
}
