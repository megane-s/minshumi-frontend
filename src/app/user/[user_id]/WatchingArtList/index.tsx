import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import { WatchingArtImage } from "./WatchingArtImage"
import { getWatchingArts } from "@/art/watching/get"
import { UserId } from "@/user/type"
import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle"
import { flex } from "styled-system/patterns"
interface WatchingArtListProps {
    userId: UserId
}
export const WatchingArtList: FC<WatchingArtListProps> = async ({ userId }) => {
    const arts = await getWatchingArts(userId)
    return (
        <div>
            <Carousel
                slideSize="fit-content"
                slideGap="sm"
                align={arts.length === 0 ? "center" : "start"}
                controlsOffset="0"
            >
                {arts.map(art =>
                    <CarouselSlide key={art.artId}>
                        <WatchingArtImage
                            art={art}
                        />
                    </CarouselSlide>
                )}
                {arts.length === 0 &&
                    <CarouselSlide className={flex({ flexDir: "column", w: "full", p: 1, justify: "space-evenly", align: "center", my: "md" })}>
                        <Image
                            src="/cat.png"
                            alt='none'
                            width={200}
                            height={200}
                        />
                        <SectionTitle my="md">
                            今見ている作品が無いようです....
                        </SectionTitle>
                    </CarouselSlide>
                }
            </Carousel>
        </div>
    )
}
