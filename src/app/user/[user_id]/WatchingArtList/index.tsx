import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import { WatchingArtImage } from "./WatchingArtImage"
import { getWatchingArts } from "@/art/watching/get"
import { UserId } from "@/user/type"

interface WatchingArtListProps {
    userId: UserId
}
export const WatchingArtList: FC<WatchingArtListProps> = async ({ userId }) => {
    const arts = await getWatchingArts(userId)
    return (
        <Carousel
            slideSize="fit-content"
            slideGap="sm"
            align="start"
            controlsOffset="0"
        >
            {/* TODO 0件の時の表示 */}
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
