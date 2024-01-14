import { Art } from "@/art/type"
import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import { WatchingArtImage } from "./WatchingArtImage"

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
                    <WatchingArtImage
                        art={art}
                    />
                </CarouselSlide>
            )}
        </Carousel>
    )
}
