import { Carousel, CarouselSlide } from "@/components/Carousel"
import { FC } from "react"
import { WatchingArtImage } from "./WatchingArtImage"
import { getWatchingArts } from "@/art/watching/get"
import { UserId } from "@/user/type"
import Image from "next/image";
import { Flex } from "@mantine/core"
import { SectionTitle } from "@/components/SectionTitle"
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
            {arts.length === 0 &&
                <Flex p={1} justify={"space-evenly"} my="md">
                    <center>
                        <Image
                            src="/cat.png"
                            alt='none'
                            width={200}
                            height={200}
                        />
                        <SectionTitle my="md">
                            今見ている作品がまだ無いようです....
                        </SectionTitle>

                    </center>
                </Flex>
            }
        </div>
    )
}
